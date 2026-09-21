import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SymptomLogEntry, DOMAIN_METADATA, BASE_SYMPTOMS_CATALOG } from '../../domain/models/symptom';
import { StrawStageInfo, MenstrualCycleEntry } from '../../domain/models/straw';

export class GenerateDoctorReportUseCase {
  generatePdf(
    patientAlias: string,
    age: number,
    strawStage: StrawStageInfo,
    cycles: MenstrualCycleEntry[],
    symptoms: SymptomLogEntry[],
    timeRangeDays: number = 90
  ): jsPDF {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryTeal = [0, 128, 128]; // #008080
    const textDark = [30, 41, 59];     // #1E293B

    // Header Banner
    doc.setFillColor(0, 128, 128);
    doc.rect(0, 0, 210, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('FLOW-GIRL | INFORME CLÍNICO LONGITUDINAL DE SALUD HORMONAL', 14, 12);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Documento de soporte para diagnóstico ginecológico y evaluación de Terapia Hormonal (THM)', 14, 18);

    // Patient & Clinical Context Block
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('1. RESUMEN EPIDEMIOLÓGICO Y ESTADIFICACIÓN STRAW+10', 14, 34);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const dateStr = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    
    doc.text(`Identificador de Paciente: ${patientAlias} (Edad: ${age} años)`, 14, 40);
    doc.text(`Fecha de Emisión: ${dateStr} | Periodo Analizado: Últimos ${timeRangeDays} días`, 14, 45);
    
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(14, 49, 182, 22, 2, 2, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.text(`Clasificación STRAW+10 Estimada: ${strawStage.code} — ${strawStage.title}`, 18, 55);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`Criterio: ${strawStage.cycleHallmark}`, 18, 61);
    doc.text(`Perfil Endocrino Asociado: ${strawStage.hormonalProfile}`, 18, 66);

    // Section 2: Menstrual Cycle Variability
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('2. ANÁLISIS DE VARIABILIDAD DEL CICLO MENSTRUAL', 14, 80);

    const cycleRows = cycles.slice(-5).map(c => [
      c.startDate,
      `${c.lengthDays} días`,
      c.flowIntensity === 'heavy' ? 'Abundante' : c.flowIntensity === 'moderate' ? 'Moderado' : c.flowIntensity === 'light' ? 'Leve' : 'Spotting',
      c.notes || 'Sin incidencias'
    ]);

    autoTable(doc, {
      startY: 83,
      head: [['Fecha Inicio', 'Duración del Ciclo', 'Intensidad de Flujo', 'Observaciones']],
      body: cycleRows.length > 0 ? cycleRows : [['No hay registros suficientes', '-', '-', '-']],
      theme: 'grid',
      headStyles: { fillColor: [0, 128, 128], textColor: 255, fontSize: 8.5 },
      styles: { fontSize: 8, cellPadding: 2 },
      margin: { left: 14, right: 14 }
    });

    // Section 3: Multi-domain Symptoms Breakdown
    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('3. MATRIZ DE BIOMARCADORES Y SINTOMATOLOGÍA TRANSVERSAL (>80 DATAPOINTS)', 14, finalY);

    // Group symptoms by domain and calculate averages
    const domainCounts: Record<string, { count: number; avgIntensity: number; totalIntensity: number }> = {};
    
    symptoms.forEach(s => {
      if (!domainCounts[s.domain]) {
        domainCounts[s.domain] = { count: 0, avgIntensity: 0, totalIntensity: 0 };
      }
      domainCounts[s.domain].count += 1;
      domainCounts[s.domain].totalIntensity += s.intensity;
    });

    Object.keys(domainCounts).forEach(domainKey => {
      const d = domainCounts[domainKey];
      d.avgIntensity = Number((d.totalIntensity / d.count).toFixed(1));
    });

    const symptomTableRows = Object.keys(DOMAIN_METADATA).map(domainKey => {
      const meta = DOMAIN_METADATA[domainKey as keyof typeof DOMAIN_METADATA];
      const stats = domainCounts[domainKey] || { count: 0, avgIntensity: 0 };
      
      // Top symptoms in this domain
      const topSymptoms = symptoms
        .filter(s => s.domain === domainKey)
        .map(s => {
          const def = BASE_SYMPTOMS_CATALOG.find(b => b.id === s.symptomId);
          return `${def?.name || s.symptomId} (Int: ${s.intensity}/10)`;
        })
        .slice(0, 3)
        .join(', ');

      return [
        meta.label,
        `${stats.count} episodios`,
        stats.count > 0 ? `${stats.avgIntensity} / 10` : '0 / 10',
        topSymptoms || 'Sin registros en el periodo'
      ];
    });

    autoTable(doc, {
      startY: finalY + 4,
      head: [['Dominio Clínico', 'Frecuencia Registrada', 'Intensidad Media', 'Síntomas Prevalentes']],
      body: symptomTableRows,
      theme: 'striped',
      headStyles: { fillColor: [138, 154, 91], textColor: 255, fontSize: 8.5 }, // Sage Green
      styles: { fontSize: 8, cellPadding: 2 },
      margin: { left: 14, right: 14 }
    });

    // Section 4: Therapeutic Recommendations & Conclusions
    const table2Y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('4. CONCLUSIONES CLÍNICAS Y PLAN DE ACCIÓN SUGERIDO', 14, table2Y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('• Considerar diagnóstico diferencial para sintomatología vasomotora y evaluación de elegibilidad de THM transdérmica.', 16, table2Y + 6);
    doc.text('• Se recomienda monitorización de densidad mineral ósea (DMO) y perfil lipídico ante variabilidad de ciclo persistente.', 16, table2Y + 11);
    doc.text('• Mantener intervenciones no farmacológicas: higiene circadiana, TCC para sofocos y entrenamiento de fuerza.', 16, table2Y + 16);

    // Footer
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Generado por Flow-Girl | Arquitectura Local-First Cifrada | Conforme a guías STRAW+10 & Dexeus Midlife', 14, 285);
    doc.text('Página 1 de 1', 185, 285);

    return doc;
  }
}

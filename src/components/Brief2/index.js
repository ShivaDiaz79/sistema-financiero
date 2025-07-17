"use client";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import jsPDF from "jspdf";
import "jspdf-autotable";
const questionOptions = {
// VISIÓN Y PROPÓSITO
"¿Cuál es el objetivo principal que querés que esta plataforma logre en el mercado internacional en los próximos 3 años?": [
  "Convertirse en la principal comunidad global de arquitectos e inversionistas innovadores",
    "Ser un referente para proyectos arquitectónicos sostenibles y disruptivos en Latinoamérica",
    "Establecer un ecosistema autosustentable de contenido, eventos y tokenización para arquitectura",
   
  ],
  "¿Cómo querés que la plataforma impacte y transforme el ecosistema arquitectónico y de inversión?": [
    "Facilitar la colaboración internacional y nuevas formas de financiamiento a través de tecnología",
    "Democratizar el acceso a eventos, competencias y formación especializada",
    "Impulsar un cambio cultural hacia la integración de arte, tecnología y negocio",
   
  ],
  "¿Qué valores y principios no negociables deben permear toda la marca y sus operaciones?": [
    "Transparencia, ética profesional e innovación continua",
    "Comunidad inclusiva, diversidad cultural y sostenibilidad",
    "Calidad, exclusividad y profesionalismo en cada acción",
   
  ],
  "¿Qué atributos diferencian esta plataforma de cualquier otra competencia o solución existente?": [
    "Integración completa entre arquitectura, inversión y tecnología blockchain",
    "Comunidad altamente curada con acceso a expertos y eventos de élite",
    "Contenidos exclusivos que combinan historia, cultura y vanguardia",
   
  ],

  // SEGMENTOS Y COMUNIDAD
  "¿Quiénes son los usuarios clave?": [
    "Arquitectos profesionales, inversionistas y gestores culturales",
    "Estudiantes avanzados, historiadores de arquitectura y jóvenes emprendedores",
    "Instituciones académicas, empresas tecnológicas y fondos de inversión",
   
  ],
  "¿Qué tipo de interacción y participación esperás de cada grupo?": [
    "Participación activa en foros, eventos y competencias con feedback constructivo",
    "Consumo pasivo de contenido con opción a participar en cursos y mentorías",
    "Rol de liderazgo y curaduría dentro de la comunidad con generación de contenido",
   
  ],
  "¿Cómo querés estructurar la comunidad?": [
    "Membresías escalonadas (gratuita, premium y corporativa) con beneficios claros",
    "Grupos temáticos cerrados y círculos de confianza para temas especializados",
    "Plataforma abierta con control de calidad mediante inteligencia artificial",
   
  ],
  "¿Qué mecanismos de gobernanza o liderazgo querés implementar para gestionar la comunidad?": [
    "Comité curador de expertos y embajadores regionales con roles definidos",
    "Sistemas de votación y reconocimiento público para colaboradores destacados",
    "Moderadores profesionales con soporte tecnológico para control y mejora continua",
   
  ],

  // CONTENIDOS Y EXPERIENCIAS
  "¿Qué formatos de contenido serán prioritarios para atraer y retener usuarios?": [
    "Videos cortos y entrevistas exclusivas para RRSS y web",
    "Eventos en vivo y competencias internacionales con participación digital",
    "Podcasts temáticos y artículos de análisis cultural y tecnológico",
   
  ],
  "¿Cómo planeás asegurar la calidad y relevancia de los contenidos?": [
    "Equipo editorial profesional con curaduría rigurosa y revisión de expertos",
    "Inteligencia artificial para filtrar y personalizar contenido según intereses",
    "Alianzas con instituciones académicas y culturales reconocidas",
   
  ],
  "¿Qué nivel de curaduría y automatización tecnológica esperás?": [
    "Curaduría estricta con poca automatización para mantener calidad premium",
    "Curaduría guiada con apoyo de IA para escalabilidad y personalización",
    "Automatización total con algoritmos para recomendaciones y moderación",
   
  ],
  "¿Querés incorporar elementos disruptivos como realidad aumentada, inteligencia artificial o blockchain?": [
    "Sí, todos para crear experiencias inmersivas y seguridad en transacciones",
    "Solo IA y blockchain para recomendaciones y tokenización, no AR",
    "No en esta fase inicial, pero considerar a mediano plazo",
   
  ],

  // TECNOLOGÍA Y PLATAFORMA
  "¿Qué funcionalidades básicas debe tener la plataforma desde el día uno?": [
    "Registro y perfiles detallados, feed de noticias, eventos y comunidad",
    "Panel de concursos y gestión de pagos (cripto y fiat)",
    "Herramientas para comunicación directa (chat, mensajes, videollamadas)",
   
  ],
  "¿Querés que la plataforma sea escalable y modular para incorporar nuevos servicios?": [
    "Sí, con arquitectura abierta y APIs para integración futura",
    "Parcialmente, con módulos limitados a los servicios clave definidos",
    "No, prefiero un desarrollo cerrado y optimizado inicialmente",
   
  ],
  "¿Qué rol jugarán las tecnologías emergentes (IA, blockchain, cripto pagos) en la operación diaria?": [
    "Pilar central para experiencia de usuario, seguridad y monetización",
    "Complemento para funciones específicas, no en todo el sistema",
    "Solo en fases avanzadas tras validar mercado y tecnología",
   
  ],
  "¿Cómo gestionarás la seguridad, privacidad y protección de datos?": [
    "Políticas estrictas, cifrado end-to-end y cumplimiento de normativas internacionales",
    "Enfoque gradual, priorizando usabilidad con mejoras continuas",
    "Mínimo indispensable para lanzamiento rápido, reforzando luego",
   
  ],

  // MODELO DE NEGOCIO Y MONETIZACIÓN
  "¿Cuáles serán las principales fuentes de ingresos?": [
    "Membresías, eventos pagos, patrocinios y venta de contenidos exclusivos",
    "Comisiones por inversiones, tokenización y marketplace de servicios",
    "Publicidad cultural y alianzas estratégicas con marcas afines",
   
  ],
  "¿Qué estrategia de precios y paquetes pensás implementar?": [
    "Tarifas claras y accesibles para atraer masa crítica rápidamente",
    "Precios premium para crear percepción de exclusividad y valor",
    "Mix de gratuitos con servicios adicionales pagos (freemium)",
   
  ],
  "¿Estás interesado en un sistema de incentivos digitales, como tokens o recompensas basadas en participación?": [
    "Sí, totalmente integrado y vinculado a reputación y beneficios",
    "Parcialmente, solo para ciertos segmentos o eventos especiales",
    "No, prefiero métodos tradicionales de fidelización",
   
  ],
  "¿Qué modelo financiero considerás sostenible a largo plazo?": [
    "Diversificación de ingresos con enfoque en membresías y eventos",
    "Enfoque en alianzas y patrocinadores con bajos costos fijos",
    "Ecosistema autogestionado con tokens y economía interna",
   
  ],

  // COMUNIDAD, GOBERNANZA Y OPERACIÓN
  "¿Cómo será la estructura organizacional para gestionar la plataforma?": [
    "Equipo interno multidisciplinario con roles claros y apoyo externo",
    "Alianzas estratégicas con entidades académicas y culturales",
    "Gobernanza descentralizada con participación activa de la comunidad",
   
  ],
  "¿Qué reglas y normas de convivencia y participación vas a implementar?": [
    "Código de conducta estricto y sanciones claras para infractores",
    "Normas flexibles adaptadas según comunidad y contexto",
    "Moderación automática con supervisión humana",
   
  ],
  "¿Qué mecanismos de feedback y mejora continua aplicarás con la comunidad?": [
    "Encuestas periódicas, focus groups y buzón de sugerencias online",
    "Análisis de métricas de uso e interacciones para ajustar servicios",
    "Eventos de co-creación y talleres con usuarios clave",
   
  ],

  // MARKETING, LANZAMIENTO Y CRECIMIENTO
  "¿Cuál es la estrategia para generar expectativa y atraer a los primeros usuarios?": [
    "Campañas teaser en redes sociales con influencers y expertos",
    "Eventos presenciales y webinars de lanzamiento exclusivos",
    "Alianzas estratégicas con universidades, fondos e instituciones",
   
  ],
  "¿Qué canales y formatos usarás para el lanzamiento?": [
    "Instagram, LinkedIn, TikTok y YouTube con contenido audiovisual",
    "Medios especializados y prensa digital de arquitectura y tecnología",
    "Email marketing y newsletters segmentados",
   
  ],
  "¿Qué tipo de alianzas estratégicas buscarás para amplificar el alcance?": [
    "Instituciones académicas y centros culturales internacionales",
    "Plataformas tecnológicas y empresas de inversión",
    "Medios de comunicación especializados y creadores de contenido",
   
  ],
  "¿Cómo medirás el éxito y crecimiento en los primeros 12 meses?": [
    "Número de usuarios activos y tasa de retención",
    "Ingresos generados por membresías y eventos",
    "Impacto en redes y menciones en medios especializados",
   
  ],

  // IMPACTO CULTURAL Y VISIÓN A FUTURO
  "¿Qué rol cultural o social querés que tenga la plataforma en el ecosistema latinoamericano e internacional?": [
    "Motor de cambio y visibilidad para arquitectos y comunidades emergentes",
    "Plataforma puente entre tradición cultural y tecnología innovadora",
    "Referente global para la integración cultural y profesional",
   
  ],
  "¿Cómo planeás expandir la marca y comunidad globalmente sin perder identidad?": [
    "Creando capítulos regionales con autonomía y visión común",
    "Manteniendo una identidad sólida y comunicando valores claros",
    "Adaptando contenidos y servicios a culturas locales sin perder esencia",
   
  ],
  "¿Qué innovación disruptiva o visión a largo plazo querés que la plataforma lidere?": [
    "Integración total de IA y blockchain para democratizar arquitectura",
    "Ecosistema tokenizado con economía colaborativa global",
    "Revolución cultural que integre arquitectura, arte y nuevas tecnologías",
   
  ],
};


const questions = Object.entries(questionOptions).map(([q, opts]) => ({
  question: q,
  options: opts,
}));

// === COMPONENTE ===
export default function Brief2() {
  const [responses, setResponses] = useState({});
  const [submittedBriefs, setSubmittedBriefs] = useState([]);
  const [showBriefs, setShowBriefs] = useState(false);
  const [editingBrief, setEditingBrief] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadBriefs = async () => {
      const snapshot = await getDocs(collection(db, "brief2")); // ahora apunta a brief2
      setSubmittedBriefs(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    loadBriefs();
  }, []);

  const handleSelect = (question, value) => {
    setResponses((prev) => {
      const current = prev[question] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value].slice(0, 3);
      return { ...prev, [question]: updated };
    });
  };

  const handleOtherChange = (question, value) => {
    setResponses((prev) => ({
      ...prev,
      [question]: [
        ...(prev[question] || []).filter((v) => !v.startsWith("Otro:")),
        `Otro: ${value}`,
      ],
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "brief2"), responses); // guarda en brief2
      setResponses({});
      const snapshot = await getDocs(collection(db, "brief2"));
      setSubmittedBriefs(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setEditingBrief(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "brief2", id)); // elimina de brief2
    setSubmittedBriefs(submittedBriefs.filter((b) => b.id !== id));
  };

  const handleEdit = (brief) => {
    setResponses(brief);
    setEditingBrief(brief);
  };

  const downloadPDF = () => {
    const docPDF = new jsPDF();
    submittedBriefs.forEach((brief, index) => {
      if (index > 0) docPDF.addPage();
      docPDF.setFontSize(16);
      docPDF.text("Brief Estratégico Completo", 14, 20);
      let y = 30;
      Object.entries(brief).forEach(([question, answer]) => {
        docPDF.setFontSize(12);
        docPDF.text(question, 14, y);
        y += 7;
        const answerText = Array.isArray(answer) ? answer.join(", ") : answer;
        docPDF.setFontSize(10);
        const splitText = docPDF.splitTextToSize(answerText, 180);
        docPDF.text(splitText, 14, y);
        y += splitText.length * 7 + 5;
        if (y > 270) {
          docPDF.addPage();
          y = 20;
        }
      });
    });
    docPDF.save("briefs.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h2 className="text-2xl font-bold">Brief Estratégico Completo PATAFORMA INTERNACIONAL</h2>
      {questions.map(({ question, options }) => (
        <div key={question} className="space-y-2">
          <label className="block font-medium text-gray-700">{question}</label>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => handleSelect(question, opt)}
                className={`px-3 py-1 rounded-full border ${
                  responses[question]?.includes(opt)
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Otro..."
            className="w-full mt-2 border p-2 rounded"
            onChange={(e) => handleOtherChange(question, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 rounded text-lg font-semibold ${
          isSubmitting
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-900"
        }`}
      >
        {isSubmitting ? "Enviando..." : "Enviar Brief"}
      </button>

      <button
        onClick={() => setShowBriefs(!showBriefs)}
        className="w-full bg-gray-100 border mt-10 py-2 text-gray-800 rounded hover:bg-gray-200"
      >
        {showBriefs ? "Ocultar Briefs" : "Ver Brief enviado"}
      </button>

      {showBriefs && submittedBriefs.length > 0 && (
        <div className="mt-6 space-y-6">
          {submittedBriefs.map((brief) => (
            <div
              key={brief.id}
              className="p-6 border rounded-md shadow-md bg-white"
            >
              {Object.entries(brief).map(([q, a]) => (
                <div key={q} className="mb-2">
                  <p className="font-semibold text-gray-700">{q}</p>
                  <p className="text-gray-800 text-sm">
                    {Array.isArray(a) ? a.join(", ") : a}
                  </p>
                </div>
              ))}
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleEdit(brief)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded shadow mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(brief.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded shadow"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={downloadPDF}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded text-lg font-semibold hover:bg-blue-700"
          >
            Descargar PDF
          </button>
        </div>
      )}
    </div>
  );
}
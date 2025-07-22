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
  // 1. SITUACIÓN ACTUAL Y PROCESO DE VENTAS
  "¿Cómo estás vendiendo hoy tu curso de francés?": [
    "Solo por redes sociales respondiendo mensajes manualmente",
    "A través de WhatsApp con algunas respuestas rápidas",
    "Tengo una página pero no convierte lo suficiente",
    "Es todo orgánico, sin embudo ni automatizaciones"
  ],
  "¿Qué canal te trajo más ventas en las últimas semanas?": [
    "Mensajes por WhatsApp",
    "Instagram (historias, publicaciones, reels)",
    "Referencias o alumnos anteriores",
    "Publicidad paga (Meta Ads, Google Ads, etc.)"
  ],
  "¿Cuál es tu mayor desafío al vender hoy?": [
    "No tengo tiempo para responder todos los mensajes",
    "Los interesados no responden después de pedir info",
    "No sé cómo transmitir el valor del curso",
    "Tengo visitas, pero no se convierten en ventas"
  ],
  "¿Cuánto tiempo suele pasar entre que una persona pide info y toma decisión?": [
    "Menos de 24 horas",
    "1 a 3 días",
    "Más de una semana",
    "La mayoría no responde más"
  ],
  "¿Tenés ya armado algún mensaje o estructura para vender por WhatsApp?": [
    "Sí, uso un speech que me funciona bien",
    "Tengo algunos mensajes sueltos que repito",
    "No, respondo distinto según cada persona"
  ],

  // 2. OBJECIONES Y CIERRE
  "¿Qué objeciones escuchás más seguido?": [
    "No tengo tiempo para estudiar",
    "No me alcanza el presupuesto ahora",
    "Ya hice otros cursos que no me sirvieron",
    "Estoy interesado pero lo voy a pensar"
  ],
  "¿Cómo manejás esas objeciones?": [
    "Tengo respuestas preparadas para cada caso",
    "Respondo según la conversación",
    "No sé bien cómo responderlas todavía"
  ],
  "¿Qué parte del proceso de ventas sentís que más podrías mejorar?": [
    "La velocidad de respuesta",
    "La claridad del mensaje",
    "El cierre efectivo",
    "El seguimiento a interesados"
  ],

  // 3. CLIENTE, OFERTA Y DIFERENCIACIÓN
  "¿Quién es tu cliente ideal hoy?": [
    "Adultos que quieren trabajar o migrar a Europa",
    "Personas que necesitan certificar en francés",
    "Gente frustrada con otros cursos que no les funcionaron",
    "Autodidactas que valoran estructura + autonomía"
  ],
  "¿Qué resultado concreto promete tu curso?": [
    "Aprender francés desde cero hasta hablar con fluidez",
    "Dominar el idioma con una metodología práctica y moderna",
    "Prepararse para exámenes oficiales como DELF o TEF",
    "Aprender a usar IA para practicar sin depender del aula"
  ],
  "¿Qué hace único a tu curso frente a otros?": [
    "Incluye mapa de avance, IA, y mentoría personalizada",
    "El enfoque es práctico, concreto, sin teoría vacía",
    "Brinda resultados medibles con seguimiento real",
    "Es más accesible y aplicable que los cursos tradicionales"
  ],
  "¿Qué tipo de contenido valoran más tus alumnos?": [
    "Guías prácticas para aplicar lo aprendido",
    "Ejercicios interactivos o con IA",
    "Acompañamiento humano y correcciones",
    "Casos reales y materiales aplicados a objetivos (trabajo, migración, etc.)"
  ],

  // 4. ACTIVOS DISPONIBLES
  "¿Tenés testimonios en video o texto que podamos usar?": [
    "Sí, tengo algunos listos",
    "Tengo algunos mensajes pero no están organizados",
    "Todavía no, pero puedo pedirlos"
  ],
  "¿Ya tenés logo, colores y tipografía definidos?": [
    "Sí, tengo identidad de marca completa",
    "Tengo logo, pero la identidad no está bien definida aún",
    "No tengo nada definido todavía"
  ],
  "¿Tenés enlaces de pago, formulario de inscripción o sistema de cobro ya funcionando?": [
    "Sí, todo listo para recibir pagos",
    "Sí, pero no está automatizado",
    "No, necesito ayuda con eso"
  ],
  "¿Ya tenés armado algún tipo de base de datos con personas interesadas?": [
    "Sí, con seguimiento manual",
    "Solo los tengo en el chat de WhatsApp",
    "No, pero me gustaría comenzar a organizar eso"
  ],

  // 5. LANDING Y VSL
  "¿Qué querés que sienta alguien cuando entra a tu nueva landing?": [
    "Que entendió rápido cómo funciona el curso y cómo lo puede ayudar",
    "Que encontró una solución práctica, clara y diferente",
    "Confianza para avanzar y tomar acción enseguida"
  ],
  "¿Qué elementos sí o sí querés que tenga la página?": [
    "Video explicativo de máximo 5 minutos",
    "Testimonios o evidencia de resultados",
    "Resumen claro de módulos, beneficios y próximos pasos",
    "Botón para contacto directo o link de pago"
  ],
  "¿Estás dispuesto/a a aparecer en el video o preferís una voz en off profesional?": [
    "Sí, quiero hablar en cámara yo mismo/a",
    "Prefiero una voz profesional que lo narre",
    "Estoy abierto a sugerencias según lo que funcione mejor"
  ],
  "¿Qué querés lograr con esta landing en el corto plazo?": [
    "Aumentar conversiones con el mismo tráfico que tengo hoy",
    "Ahorrar tiempo automatizando parte de las ventas",
    "Tener un sistema que funcione todos los días sin depender 100% de mí",
    "Escalar con anuncios sin perder el control del proceso"
  ],

  // 6. FUNNEL ACTUAL Y CONVERSIÓN (ampliado)
  "¿Cuál es tu flujo actual de venta?": [
    "Publico en redes > Me escriben por WhatsApp > Respondo manualmente",
    "Hago campañas > Me piden info > Hago seguimiento",
    "Todo es orgánico, aún no invierto en ads",
    "Tengo tráfico pero no convierte, no sé por qué"
  ],
  "¿Qué porcentaje aproximado de personas que te escriben terminan comprando?": [
    "Más del 30%",
    "Entre 10% y 30%",
    "Menos del 10%",
    "No lo sé / no lo estoy midiendo"
  ],
  "¿Tenés automatización de seguimiento?": [
    "Sí, tengo mensajes programados o recordatorios",
    "No, pero quiero hacerlo",
    "Solo respondo a mano"
  ],
  "¿Qué sucede cuando alguien muestra interés pero no compra?": [
    "Lo sigo manualmente",
    "Uso etiquetas o recordatorios",
    "Lo dejo pasar / no tengo seguimiento"
  ],

  // 7. PRODUCTO, PROMESA Y POSICIONAMIENTO (ampliado)
  "¿En qué se basa tu promesa principal?": [
    "Aprender francés de forma práctica y rápida",
    "Dominar el idioma para migrar, rendir o trabajar",
    "Acompañamiento humano + herramientas de IA",
    "Una experiencia educativa distinta a los métodos tradicionales"
  ],
  "¿Qué transformación le prometés al alumno?": [
    "Hablar, escribir y pensar en francés",
    "Conseguir trabajo, migrar o aprobar un examen",
    "Aprender sin frustrarse, con confianza real",
    "Avanzar con constancia sin sentirse solo"
  ],
  "¿Cómo podés demostrar que tu curso funciona?": [
    "Con testimonios reales en texto/video",
    "Con métricas de avance o resultados medibles",
    "Con casos de éxito o resultados concretos de alumnos",
    "Todavía no tengo validación pero estoy construyéndola"
  ],
  "¿Qué tipo de modalidad tiene tu curso?": [
    "100% online grabado",
    "Clases en vivo + materiales",
    "Híbrido: plataforma + comunidad + mentoría",
    "Otro formato personalizado"
  ],
  "¿Tenés distintas versiones o niveles del curso?": [
    "Sí, hay niveles o módulos progresivos",
    "Es un solo producto dividido en etapas",
    "Aún no, pero me interesa escalonar"
  ],

  // 8. AUDIENCIA Y PERFIL DE COMPRADOR (ampliado)
  "¿Quién es tu cliente ideal hoy?": [
    "Adultos que quieren trabajar o migrar a Europa",
    "Personas que necesitan certificar en francés",
    "Gente frustrada con otros cursos que no les funcionaron",
    "Autodidactas que valoran estructura + autonomía"
  ],
  "¿Qué edad, país o nivel educativo tiene tu comprador más frecuente?": [
    "Entre 20 y 35 años, universitarios o técnicos",
    "Profesionales entre 30 y 50",
    "Varía mucho, tengo público diverso",
    "No lo tengo bien definido aún"
  ],
  "¿Cuáles son las emociones que los impulsan a comprar?": [
    "Frustración con métodos anteriores",
    "Deseo de avanzar en su carrera o migrar",
    "Inspiración al ver avances de otros",
    "Necesidad urgente de lograr algo con el idioma"
  ],
  "¿Cuál es su mayor miedo o freno?": [
    "Fracasar otra vez",
    "Perder dinero o no entender nada",
    "No tener tiempo o abandonar",
    "Sentir que es muy difícil o lento"
  ],

  // 9. CONTENIDOS, ACTIVOS Y PRUEBAS (ampliado)
  "¿Qué activos de prueba social tenés disponibles?": [
    "Testimonios grabados",
    "Mensajes de WhatsApp o DMs positivos",
    "Estadísticas de progreso de alumnos",
    "No tengo aún, pero puedo pedir"
  ],
  "¿Tenés algún video explicando el curso o mostrando cómo funciona?": [
    "Sí, ya grabé uno",
    "Tengo fragmentos o lives que pueden servir",
    "No tengo aún, necesito grabarlo desde cero"
  ],
  "¿Usás algún incentivo o escasez para convertir?": [
    "Sí, con cupos limitados o precios especiales",
    "Solo promociones temporales",
    "Nada de eso por ahora, vendo sin urgencia"
  ],
  "¿Tenés una comunidad (grupo, canal, etc.) que acompañe al curso?": [
    "Sí, hay comunidad en WhatsApp o Telegram",
    "Estoy por lanzarla",
    "No, pero me interesa crear una"
  ],

  // 10. EXPERIENCIA DEL CLIENTE Y ESCALABILIDAD (ampliado)
  "¿Qué pasa después de que una persona paga?": [
    "Recibe acceso automático y empieza",
    "Le paso los datos por WhatsApp",
    "Le explico personalmente cómo avanzar",
    "No tengo automatizado ese paso todavía"
  ],
  "¿Cómo hacés seguimiento de la experiencia del alumno?": [
    "Hablo cada semana o mes para ver avances",
    "Hago encuestas o correcciones",
    "No tengo seguimiento estructurado aún"
  ],
  "¿Cómo evitás que abandonen o se frustren?": [
    "Con soporte y acompañamiento real",
    "Con materiales interactivos e IA",
    "Con un sistema de metas semanales",
    "Aún no tengo claro cómo abordarlo"
  ],
  "¿Estás listo/a para vender 10 veces más si mañana se dispara tu embudo?": [
    "Sí, tengo todo preparado para escalar",
    "Podría ajustarme, pero necesito estructura",
    "No, tengo que mejorar soporte y automatización primero"
  ],

  // 11. COMPONENTES DE LA LANDING IDEAL (ampliado)
  "¿Qué secciones querés que tenga sí o sí tu landing?": [
    "Video explicativo con CTA claro",
    "Resumen de beneficios y módulos",
    "Testimonios / validación",
    "Preguntas frecuentes + botón de contacto o pago"
  ],
  "¿Qué querés que NO tenga?": [
    "Demasiado texto",
    "Distracciones o diseño confuso",
    "Promesas vacías sin pruebas",
    "Tiempos de carga lentos o formularios largos"
  ],
  "¿Qué objetivo tiene la landing?": [
    "Cierre inmediato con botón de pago",
    "Generar leads calificados al WhatsApp",
    "Derivar tráfico al VSL y luego cerrar",
    "Capturar interesados y luego nutrir por email"
  ],
  "¿Qué acción querés que realice el usuario principal?": [
    "Comprar",
    "Agendar una llamada / escribir al WhatsApp",
    "Ver el video completo y luego avanzar",
    "Dejar sus datos para seguimiento"
  ],

  // 12. TÉCNICA Y SOPORTE (ampliado)
  "¿Ya tenés dominio, hosting o acceso a tu web actual?": [
    "Sí, tengo todo configurado",
    "Solo el dominio o solo el hosting",
    "Todavía no tengo nada montado"
  ],
  "¿Cómo vas a cobrar?": [
    "Con link de pago (MercadoPago, Stripe, etc.)",
    "Transferencias manuales",
    "WhatsApp + captura + registro manual",
    "Estoy buscando la mejor forma de automatizar eso"
  ],
  "¿Querés que la landing esté optimizada para campañas pagas?": [
    "Sí, quiero escalar con anuncios",
    "Primero quiero validar orgánicamente",
    "Quiero ambas opciones listas desde el inicio"
  ],
  "¿Querés que conectemos analíticas o pixel desde el inicio?": [
    "Sí, para medir todo desde el día uno",
    "Sí, pero no sé cómo hacerlo",
    "Todavía no, quiero algo simple primero"
  ],

  // 13. DISEÑO E IMAGEN CORPORATIVA
  "¿Tenés alguna tipografía o estilo visual que querés mantener?": [
    "Sí, tipografía moderna y limpia",
    "Prefiero algo clásico y elegante",
    "Estoy abierto a recomendaciones"
  ],
  "¿Querés que usemos los colores de tu marca o hacemos propuesta nueva?": [
    "Mantener colores actuales",
    "Proponer paleta nueva para mejor conversión",
    "Me gusta combinar colores clásicos y modernos"
  ],
  "¿Podés compartir la historia detrás de Liberté y cómo surgió el curso?": [
    "Sí, quiero que sea parte de la historia para conectar emocionalmente",
    "Prefiero enfocarme en beneficios y resultados",
    "Me gustaría combinar historia y propuesta"
  ]
};



const questions = Object.entries(questionOptions).map(([q, opts]) => ({
  question: q,
  options: opts,
}));

// === COMPONENTE ===
export default function Brief3() {
  const [responses, setResponses] = useState({});
  const [submittedBriefs, setSubmittedBriefs] = useState([]);
  const [showBriefs, setShowBriefs] = useState(false);
  const [editingBrief, setEditingBrief] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadBriefs = async () => {
      const snapshot = await getDocs(collection(db, "brief3")); // ahora apunta a brief3
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
      await addDoc(collection(db, "brief3"), responses); // guarda en brief3
      setResponses({});
      const snapshot = await getDocs(collection(db, "brief3"));
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
    await deleteDoc(doc(db, "brief3", id)); // elimina de brief3
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
      <h2 className="text-2xl font-bold">Brief Estratégico Completo Liberte</h2>
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
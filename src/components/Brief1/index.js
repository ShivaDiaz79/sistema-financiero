// "use client";
// import { useState, useEffect } from "react";
// import { db } from "@/utils/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   serverTimestamp,
//   updateDoc,
// } from "firebase/firestore";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// // const questionOptions = {
// //   "¿Qué te motivó a iniciar este estudio ahora, en este momento de tu vida profesional?":
// //     [
// //       "Búsqueda de independencia profesional",
// //       "Proyecto familiar o legado",
// //       "Momento de madurez creativa",
// //     ],
// //   "¿Qué legado o aporte te gustaría dejar en el rubro de la arquitectura?": [
// //     "Innovación y sostenibilidad",
// //     "Transformación urbana",
// //     "Impacto social positivo",
// //   ],
// //   "¿Cómo definirías tu mirada personal sobre la arquitectura?": [
// //     "Humanista y centrada en el usuario",
// //     "Funcional y eficiente",
// //     "Poética y conceptual",
// //   ],
// //   "¿Qué cosas no querés repetir de otras experiencias o estructuras tradicionales?":
// //     [
// //       "Burocracia excesiva",
// //       "Relaciones jerárquicas rígidas",
// //       "Desconexión con el cliente",
// //     ],
// //   "¿Cómo te imaginás el estudio dentro de 5 años?": [
// //     "Estudio consolidado con equipo multidisciplinario",
// //     "Proyectos internacionales en curso",
// //     "Influencia reconocida en la comunidad",
// //   ],
// //   "¿Qué servicios incluirá?": [
// //     "Diseño arquitectónico",
// //     "Consultoría y dirección de obra",
// //     "Gestión de proyectos integrales",
// //   ],
// //   "¿Querés tener alianzas con profesionales de otras disciplinas?": [
// //     "Sí, con diseñadores y urbanistas",
// //     "Solo alianzas estratégicas puntuales",
// //     "No, prefiero un equipo interno completo",
// //   ],
// //   "¿Hay servicios que querés evitar o que ya no te interesan ofrecer?": [
// //     "Remodelaciones menores",
// //     "Servicios técnicos sin diseño",
// //     "Asesorías sin involucramiento creativo",
// //   ],
// //   "¿Cuáles son los 3 valores más importantes que deben guiar el estudio?": [
// //     "Compromiso, innovación y ética",
// //     "Empatía, sustentabilidad y estética",
// //     "Transparencia, calidad y responsabilidad social",
// //   ],
// //   "¿Cuál es la relación ideal que te gustaría tener con los clientes?": [
// //     "Colaborativa y horizontal",
// //     "Basada en la confianza mutua",
// //     "Didáctica y cercana",
// //   ],
// //   "¿Hay alguna corriente filosófica, cultural o espiritual que influya en tu forma de trabajar o diseñar?":
// //     [
// //       "Minimalismo japonés",
// //       "Arquitectura bioclimática",
// //       "Espiritualidad cristiana o ancestral",
// //     ],
// //   "¿Cómo definís el éxito de un proyecto, más allá del resultado estético?": [
// //     "Satisfacción del cliente y del usuario",
// //     "Impacto positivo en el entorno",
// //     "Proceso armónico y eficiente",
// //   ],
// //   "¿Querés que el estudio tenga un nombre personal, conceptual o abstracto?": [
// //     "Personal: ligado a mi nombre",
// //     "Conceptual: ligado a una idea o valor",
// //     "Abstracto: evocador y creativo",
// //   ],
// //   "¿Qué emoción o sensación te gustaría que el nombre genere en quien lo escucha?":
// //     ["Inspiración", "Confianza", "Curiosidad"],
// //   "¿Querés que la marca tenga una carga poética o sea más técnica y directa?": [
// //     "Poética y artística",
// //     "Técnica y precisa",
// //     "Equilibrada entre ambas",
// //   ],
// //   "¿Cómo NO querés que sea la marca?": [
// //     "Fría y corporativa",
// //     "Superficial o sin profundidad",
// //     "Demasiado rígida o formal",
// //   ],
// //   "¿Qué tipo de personas o empresas te gustaría que contraten al estudio?": [
// //     "Personas comprometidas con el diseño",
// //     "Empresas con visión de futuro",
// //     "Clientes abiertos a la innovación",
// //   ],
// //   "¿Cuáles son los principales dolores o desafíos que enfrentan tus futuros clientes al encarar un proyecto arquitectónico?":
// //     [
// //       "Falta de visión clara",
// //       "Presupuesto limitado",
// //       "Miedo a lo nuevo o no tradicional",
// //     ],
// //   "¿Cómo te gustaría que se sintieran durante y después de trabajar con vos?": [
// //     "Acompañados y entendidos",
// //     "Inspirados y satisfechos",
// //     "Confiados y tranquilos",
// //   ],
// //   "¿Qué tipo de clientes preferís evitar o rechazar?": [
// //     "Desorganizados y sin compromiso",
// //     "Autoritarios y cerrados al diálogo",
// //     "Interesados solo en lo barato y rápido",
// //   ],
// //   "¿Qué sentís que vos o tu estudio van a ofrecer distinto a lo que ya hay en el mercado?":
// //     [
// //       "Mirada integral y personalizada",
// //       "Procesos transparentes y colaborativos",
// //       "Énfasis en diseño con propósito",
// //     ],
// //   "¿Qué cosas solés hacer diferente aunque el cliente no se entere?": [
// //     "Documentación detallada y clara",
// //     "Análisis profundo del contexto",
// //     "Revisión constante con el equipo",
// //   ],
// //   "¿Qué estudios competidores admirás o con quiénes te gustaría compararte?": [
// //     "Estudios de referencia ética y estética",
// //     "Competidores con fuerte presencia internacional",
// //     "Pequeños estudios con gran impacto",
// //   ],
// //   "¿Qué canales querés que tenga el estudio?": [
// //     "Instagram y portafolio web",
// //     "LinkedIn y medios especializados",
// //     "Newsletter y YouTube educativo",
// //   ],
// //   "¿Qué tono de voz querés usar en la comunicación?": [
// //     "Amable y profesional",
// //     "Inspirador y empático",
// //     "Directo pero cálido",
// //   ],
// //   "¿Qué tipo de contenido creés que podríamos generar?": [
// //     "Detrás de escena del proceso",
// //     "Contenido educativo y reflexivo",
// //     "Galerías visuales del trabajo",
// //   ],
// //   "¿Qué frecuencia y estilo visual te gustaría tener en redes?": [
// //     "2 veces por semana, estilo sobrio y elegante",
// //     "Contenido mensual, estilo cálido y cercano",
// //     "Estilo visual disruptivo y artístico",
// //   ],
// //   "En los próximos 6 a 12 meses, ¿qué te gustaría lograr?": [
// //     "Lanzamiento oficial del estudio",
// //     "Primeros clientes satisfechos",
// //     "Portafolio sólido y coherente",
// //   ],
// //   "¿Qué obstáculos creés que tenemos que evitar desde el principio?": [
// //     "Desorden interno y mala comunicación",
// //     "Clientes sin afinidad con los valores del estudio",
// //     "Promesas no cumplidas o expectativas desalineadas",
// //   ],
// //   "¿Tenés material ya desarrollado?": [
// //     "Sí, tengo proyectos listos para mostrar",
// //     "Solo bocetos e ideas iniciales",
// //     "Nada aún, está en desarrollo",
// //   ],
// //   "¿Disponés de tiempo para grabar videos, hacer entrevistas o generar contenido con tu voz o rostro si es necesario?":
// //     [
// //       "Sí, estoy totalmente disponible",
// //       "Puedo organizarme ocasionalmente",
// //       "Prefiero delegarlo a otra persona",
// //     ],
// //   "¿Hay alguien más que vaya a participar en decisiones de marca o contenido?":
// //     [
// //       "Sí, familiares o socios estratégicos",
// //       "Solo yo decido todo",
// //       "Dependiendo del área, se consulta a otros",
// //     ],
// //   "Compartinos cuentas, sitios o imágenes que te inspiran.": [
// //     "Estudios de arquitectura internacionales",
// //     "Referentes de arte y diseño visual",
// //     "Proyectos locales con impacto social",
// //   ],
// //   "¿Tenés una paleta de colores o estilo gráfico que ya uses o te guste?": [
// //     "Sí, definida y en uso",
// //     "Estoy buscando una identidad visual",
// //     "No tengo nada definido todavía",
// //   ],
// //   "¿Cómo te imaginás que debería sentirse el sitio web al navegarlo?": [
// //     "Limpio y fácil de usar",
// //     "Inspirador y sensorial",
// //     "Rico en contenido y referencias",
// //   ],
// // };


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

// const questionOptions = {
//   "¿Qué te motivó a iniciar este estudio ahora, en este momento de tu vida profesional?":
//     [
//       "Búsqueda de independencia profesional",
//       "Proyecto familiar o legado",
//       "Momento de madurez creativa",
//     ],
//   "¿Qué legado o aporte te gustaría dejar en el rubro de la arquitectura?": [
//     "Innovación y sostenibilidad",
//     "Transformación urbana",
//     "Impacto social positivo",
//   ],
//   "¿Cómo definirías tu mirada personal sobre la arquitectura?": [
//     "Humanista y centrada en el usuario",
//     "Funcional y eficiente",
//     "Poética y conceptual",
//   ],
//   "¿Qué cosas no querés repetir de otras experiencias o estructuras tradicionales?":
//     [
//       "Burocracia excesiva",
//       "Relaciones jerárquicas rígidas",
//       "Desconexión con el cliente",
//     ],
//   "¿Cómo te imaginás el estudio dentro de 5 años?": [
//     "Estudio consolidado con equipo multidisciplinario",
//     "Proyectos internacionales en curso",
//     "Influencia reconocida en la comunidad",
//   ],
//   "¿Qué servicios incluirá?": [
//     "Diseño arquitectónico",
//     "Consultoría y dirección de obra",
//     "Gestión de proyectos integrales",
//   ],
//   "¿Querés tener alianzas con profesionales de otras disciplinas?": [
//     "Sí, con diseñadores y urbanistas",
//     "Solo alianzas estratégicas puntuales",
//     "No, prefiero un equipo interno completo",
//   ],
//   "¿Hay servicios que querés evitar o que ya no te interesan ofrecer?": [
//     "Remodelaciones menores",
//     "Servicios técnicos sin diseño",
//     "Asesorías sin involucramiento creativo",
//   ],
//   "¿Cuáles son los 3 valores más importantes que deben guiar el estudio?": [
//     "Compromiso, innovación y ética",
//     "Empatía, sustentabilidad y estética",
//     "Transparencia, calidad y responsabilidad social",
//   ],
//   "¿Cuál es la relación ideal que te gustaría tener con los clientes?": [
//     "Colaborativa y horizontal",
//     "Basada en la confianza mutua",
//     "Didáctica y cercana",
//   ],
//   "¿Hay alguna corriente filosófica, cultural o espiritual que influya en tu forma de trabajar o diseñar?":
//     [
//       "Minimalismo japonés",
//       "Arquitectura bioclimática",
//       "Espiritualidad cristiana o ancestral",
//     ],
//   "¿Cómo definís el éxito de un proyecto, más allá del resultado estético?": [
//     "Satisfacción del cliente y del usuario",
//     "Impacto positivo en el entorno",
//     "Proceso armónico y eficiente",
//   ],
//   "¿Querés que el estudio tenga un nombre personal, conceptual o abstracto?": [
//     "Personal: ligado a mi nombre",
//     "Conceptual: ligado a una idea o valor",
//     "Abstracto: evocador y creativo",
//   ],
//   "¿Qué emoción o sensación te gustaría que el nombre genere en quien lo escucha?":
//     ["Inspiración", "Confianza", "Curiosidad"],
//   "¿Querés que la marca tenga una carga poética o sea más técnica y directa?": [
//     "Poética y artística",
//     "Técnica y precisa",
//     "Equilibrada entre ambas",
//   ],
//   "¿Cómo NO querés que sea la marca?": [
//     "Fría y corporativa",
//     "Superficial o sin profundidad",
//     "Demasiado rígida o formal",
//   ],
//   "¿Qué tipo de personas o empresas te gustaría que contraten al estudio?": [
//     "Personas comprometidas con el diseño",
//     "Empresas con visión de futuro",
//     "Clientes abiertos a la innovación",
//   ],
//   "¿Cuáles son los principales dolores o desafíos que enfrentan tus futuros clientes al encarar un proyecto arquitectónico?":
//     [
//       "Falta de visión clara",
//       "Presupuesto limitado",
//       "Miedo a lo nuevo o no tradicional",
//     ],
//   "¿Cómo te gustaría que se sintieran durante y después de trabajar con vos?": [
//     "Acompañados y entendidos",
//     "Inspirados y satisfechos",
//     "Confiados y tranquilos",
//   ],
//   "¿Qué tipo de clientes preferís evitar o rechazar?": [
//     "Desorganizados y sin compromiso",
//     "Autoritarios y cerrados al diálogo",
//     "Interesados solo en lo barato y rápido",
//   ],
//   "¿Qué sentís que vos o tu estudio van a ofrecer distinto a lo que ya hay en el mercado?":
//     [
//       "Mirada integral y personalizada",
//       "Procesos transparentes y colaborativos",
//       "Énfasis en diseño con propósito",
//     ],
//   "¿Qué cosas solés hacer diferente aunque el cliente no se entere?": [
//     "Documentación detallada y clara",
//     "Análisis profundo del contexto",
//     "Revisión constante con el equipo",
//   ],
//   "¿Qué estudios competidores admirás o con quiénes te gustaría compararte?": [
//     "Estudios de referencia ética y estética",
//     "Competidores con fuerte presencia internacional",
//     "Pequeños estudios con gran impacto",
//   ],
//   "¿Qué canales querés que tenga el estudio?": [
//     "Instagram y portafolio web",
//     "LinkedIn y medios especializados",
//     "Newsletter y YouTube educativo",
//   ],
//   "¿Qué tono de voz querés usar en la comunicación?": [
//     "Amable y profesional",
//     "Inspirador y empático",
//     "Directo pero cálido",
//   ],
//   "¿Qué tipo de contenido creés que podríamos generar?": [
//     "Detrás de escena del proceso",
//     "Contenido educativo y reflexivo",
//     "Galerías visuales del trabajo",
//   ],
//   "¿Qué frecuencia y estilo visual te gustaría tener en redes?": [
//     "2 veces por semana, estilo sobrio y elegante",
//     "Contenido mensual, estilo cálido y cercano",
//     "Estilo visual disruptivo y artístico",
//   ],
//   "En los próximos 6 a 12 meses, ¿qué te gustaría lograr?": [
//     "Lanzamiento oficial del estudio",
//     "Primeros clientes satisfechos",
//     "Portafolio sólido y coherente",
//   ],
//   "¿Qué obstáculos creés que tenemos que evitar desde el principio?": [
//     "Desorden interno y mala comunicación",
//     "Clientes sin afinidad con los valores del estudio",
//     "Promesas no cumplidas o expectativas desalineadas",
//   ],
//   "¿Tenés material ya desarrollado?": [
//     "Sí, tengo proyectos listos para mostrar",
//     "Solo bocetos e ideas iniciales",
//     "Nada aún, está en desarrollo",
//   ],
//   "¿Disponés de tiempo para grabar videos, hacer entrevistas o generar contenido con tu voz o rostro si es necesario?":
//     [
//       "Sí, estoy totalmente disponible",
//       "Puedo organizarme ocasionalmente",
//       "Prefiero delegarlo a otra persona",
//     ],
//   "¿Hay alguien más que vaya a participar en decisiones de marca o contenido?":
//     [
//       "Sí, familiares o socios estratégicos",
//       "Solo yo decido todo",
//       "Dependiendo del área, se consulta a otros",
//     ],
//   "Compartinos cuentas, sitios o imágenes que te inspiran.": [
//     "Estudios de arquitectura internacionales",
//     "Referentes de arte y diseño visual",
//     "Proyectos locales con impacto social",
//   ],
//   "¿Tenés una paleta de colores o estilo gráfico que ya uses o te guste?": [
//     "Sí, definida y en uso",
//     "Estoy buscando una identidad visual",
//     "No tengo nada definido todavía",
//   ],
//   "¿Cómo te imaginás que debería sentirse el sitio web al navegarlo?": [
//     "Limpio y fácil de usar",
//     "Inspirador y sensorial",
//     "Rico en contenido y referencias",
//   ],
// };
const questionOptions = {
  // MOTIVACIÓN Y VISIÓN
  "¿Qué te motivó a lanzar una marca de ropa para bebé?": [
    "Tuve una experiencia personal como madre/padre",
    "Noté un vacío en el mercado de diseño infantil",
    "Siempre soñé con una marca propia en este rubro",
  ],
  "¿Qué querés que represente tu marca a nivel emocional?": [
    "Amor y ternura",
    "Confianza y calidad",
    "Innovación con sensibilidad",
  ],
  "¿Qué valor diferencial querés ofrecer?": [
    "Diseño único y hecho con cuidado",
    "Prendas cómodas, seguras y sostenibles",
    "Atención personalizada y conexión real",
  ],

  // NAMING Y LOGO
  "¿Qué estilo de nombre preferís para la marca?": [
    "Dulce, simple y recordable",
    "Abstracto y creativo",
    "Inspirado en la naturaleza o lo espiritual",
  ],
  "¿Qué tipo de logo te gustaría tener?": [
    "Solo tipográfico (con una fuente especial)",
    "Tipografía + ícono (isologotipo)",
    "Un símbolo gráfico que represente ternura o infancia",
  ],
  "¿Qué elementos te gustaría que aparezcan en el logo?": [
    "Animales suaves (conejos, osos, patitos)",
    "Naturaleza (hojas, flores, lunas)",
    "Trazos simples y minimalistas",
  ],
  "¿Qué NO querés que tenga el logo?": [
    "Colores chillones o fluorescentes",
    "Estética rígida o seria",
    "Tipografías difíciles de leer",
  ],
  "¿Dónde pensás aplicar el logo?": [
    "Etiquetas textiles",
    "Packaging y stickers",
    "Web, redes y papelería",
  ],

  // PALETA Y ESTILO VISUAL
  "¿Qué colores reflejan mejor tu marca?": [
    "Tonos neutros (beige, arena, blanco)",
    "Pasteles suaves (rosado, celeste, verde agua)",
    "Colores tierra (terracota, mostaza, oliva)",
  ],
  "¿Qué estilo visual te inspira más?": [
    "Nórdico y minimalista",
    "Vintage y cálido",
    "Colorido, suave y con texturas naturales",
  ],
  "¿Qué sensación debería transmitir tu ecommerce al entrar?": [
    "Cálida y confiable",
    "Delicada y profesional",
    "Limpia, rápida y sensorial",
  ],
  "¿Qué tipo de tipografías preferís?": [
    "Redondeadas y amigables",
    "Manuscritas o script",
    "Modernas y minimalistas",
  ],

  // WHATSAPP & AUTOMATIZACIÓN
  "¿Cómo querés gestionar la comunicación por WhatsApp?": [
    "Automatizada con mensajes predefinidos",
    "Respuesta humana, pero con mensajes rápidos configurados",
    "Mixto: automático al inicio y personalizado después",
  ],
  "¿Querés enviar mensajes masivos desde una API?": [
    "Sí, para lanzamientos y promos exclusivas",
    "Sí, pero solo a clientes registrados",
    "No, prefiero responder 1 a 1",
  ],
  "¿Qué mensajes automáticos querés enviar?": [
    "Confirmación de pedido",
    "Aviso de producto enviado",
    "Recomendación según compra anterior",
  ],
  "¿Qué opciones te gustaría ofrecer por WhatsApp?": [
    "Catálogo de productos",
    "Formulario rápido de compra",
    "Soporte postventa y cambios",
  ],
  "¿Quién marcará manualmente los pedidos como enviados?": [
    "Yo desde el dashboard",
    "Un asistente logístico",
    "Me gustaría automatizarlo más adelante",
  ],
  "¿Cómo se actualizará el stock de productos?": [
    "Se descuenta automáticamente por compra",
    "Lo actualizo manualmente al final del día",
    "Desde el panel por cada venta cerrada por WhatsApp",
  ],

  // SISTEMA DE GESTIÓN Y ESCALABILIDAD
  "¿Cómo imaginás tu backend ideal?": [
    "Panel donde vea pedidos, stock y ventas diarias",
    "Dashboard con estadísticas y exportación",
    "Algo simple para actualizar precios y ver pedidos",
  ],
  "¿Querés integrar herramientas de fidelización?": [
    "Sí, club de puntos o acceso anticipado",
    "Sí, pero algo muy simple (cupones o códigos)",
    "No por ahora",
  ],
  "¿Querés tener seguimiento de pedidos por parte del cliente?": [
    "Sí, que puedan ver el estado del envío",
    "Sí, pero desde WhatsApp",
    "No, prefiero contacto directo por mensajes",
  ],

  // REDES Y CONTENIDO
  "¿Qué contenido visual te gustaría crear para redes?": [
    "Fotos reales de bebés usando la ropa",
    "Contenido lifestyle de maternidad",
    "Videos cortos tipo reels mostrando procesos",
  ],
  "¿Qué tono de voz querés usar en redes?": [
    "Cercano, dulce y auténtico",
    "Profesional, pero empático",
    "Creativo, pero simple y natural",
  ],
  "¿Con qué frecuencia querés publicar contenido?": [
    "3 veces por semana",
    "Historias diarias y posts 2 veces por semana",
    "Solo contenido de lanzamientos y novedades",
  ],
  "¿Querés incluir campañas segmentadas por edad o tipo de cliente?": [
    "Sí, por edad del bebé",
    "Sí, por regalo, mamá primeriza, etc.",
    "No por ahora",
  ],
  "¿Cómo imaginás la evolución de tu marca en 2-3 años?": [
    "Una marca referente en el país",
    "Expandirme a nuevos productos y accesorios",
    "Vender en otros países desde la tienda actual",
  ],
};

const questions = Object.entries(questionOptions).map(([q, opts]) => ({
  question: q,
  options: opts,
}));

export default function Brief1() {
  const [responses, setResponses] = useState({});
  const [submittedBriefs, setSubmittedBriefs] = useState([]);
  const [showBriefs, setShowBriefs] = useState(false);
  const [editingBrief, setEditingBrief] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadBriefs = async () => {
      const snapshot = await getDocs(collection(db, "brief"));
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

  //   const handleSubmit = async () => {
  //     await addDoc(collection(db, "brief"), responses);
  //     setResponses({});
  //     const snapshot = await getDocs(collection(db, "brief"));
  //     setSubmittedBriefs(
  //       snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //     );
  //   };
  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "brief"), responses);
      setResponses({});
      const snapshot = await getDocs(collection(db, "brief"));
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
    await deleteDoc(doc(db, "brief", id));
    setSubmittedBriefs(submittedBriefs.filter((b) => b.id !== id));
  };

  const handleEdit = (brief) => {
    setResponses(brief);
    setEditingBrief(brief);
  };
  const downloadPDF = () => {
    const doc = new jsPDF();

    submittedBriefs.forEach((brief, index) => {
      if (index > 0) doc.addPage();

      doc.setFontSize(16);
      doc.text("Brief Estratégico Completo", 14, 20);

      let y = 30;
      Object.entries(brief).forEach(([question, answer]) => {
        doc.setFontSize(12);
        doc.text(question, 14, y);
        y += 7;

        const answerText = Array.isArray(answer) ? answer.join(", ") : answer;
        doc.setFontSize(10);

        // Divide texto largo en líneas
        const splitText = doc.splitTextToSize(answerText, 180);
        doc.text(splitText, 14, y);
        y += splitText.length * 7 + 5;

        // Si y se pasa de página, agregar nueva
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
    });

    doc.save("briefs.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h2 className="text-2xl font-bold">Brief Estratégico Completo</h2>
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

      {/* <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-3 rounded text-lg font-semibold"
      >
        Enviar Brief
      </button> */}
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
        </div>
      )}
      {showBriefs && submittedBriefs.length > 0 && (
        <button
          onClick={downloadPDF}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded text-lg font-semibold hover:bg-blue-700"
        >
          Descargar PDF
        </button>
      )}
    </div>
  );
}
export type Lang = 'en' | 'es';

export const languages: Lang[] = ['en', 'es'];

export const translations = {
  // Navigation
  'nav.opportunities': { en: 'Opportunities', es: 'Oportunidades' },
  'nav.requests': { en: 'Requests', es: 'Solicitudes' },
  'nav.forBuyers': { en: 'For Buyers', es: 'Para Compradores' },
  'nav.forFinders': { en: 'For Finders', es: 'Para Buscadores' },
  'nav.membership': { en: 'Membership', es: 'Membresía' },
  'nav.howItWorks': { en: 'How It Works', es: 'Cómo Funciona' },
  'nav.privateNetwork': { en: 'Private Network', es: 'Private Network' },
  'nav.signIn': { en: 'Sign In', es: 'Iniciar Sesión' },
  'nav.workspace': { en: 'Workspace', es: 'Espacio de Trabajo' },
  'nav.signOut': { en: 'Sign out', es: 'Cerrar Sesión' },
  'nav.postRequest': { en: 'POST A REQUEST', es: 'PUBLICAR UNA SOLICITUD' },

  // Footer
  'footer.tagline': {
    en: 'A quieter way to bring qualified acquisition intent and private opportunities together.',
    es: 'Una forma más discreta de unir la intención de adquisición calificada y oportunidades privadas.',
  },
  'footer.explore': { en: 'Explore', es: 'Explorar' },
  'footer.acquisitionOpportunities': { en: 'Acquisition Opportunities', es: 'Oportunidades de Adquisición' },
  'footer.principles': { en: 'Principles', es: 'Principios' },
  'footer.confidentiality': { en: 'Confidentiality', es: 'Confidencialidad' },
  'footer.legalContact': { en: 'Legal & contact', es: 'Legal y contacto' },
  'footer.termsOfUse': { en: 'Terms of Use', es: 'Términos de Uso' },
  'footer.privacyPolicy': { en: 'Privacy Policy', es: 'Política de Privacidad' },
  'footer.finderTerms': { en: 'Finder Terms', es: 'Términos del Buscador' },
  'footer.buyerTerms': { en: 'Buyer Terms', es: 'Términos del Comprador' },
  'footer.disclaimer': { en: 'Disclaimer', es: 'Aviso Legal' },
  'footer.contact': { en: 'Contact', es: 'Contacto' },
  'footer.platformDisclaimer': {
    en: 'BuySide is a technology and introduction platform.',
    es: 'BuySide es una plataforma de tecnología e introducciones.',
  },

  // Home page
  'home.eyebrow': { en: 'THE BUY SIDE NETWORK', es: 'LA RED BUY SIDE' },
  'home.heroTitle': { en: "Find What You're Looking For.", es: 'Encuentra Lo Que Buscas.' },
  'home.heroBody': {
    en: 'Businesses, services, products, and opportunities — tell BuySide what you need and connect with people who can provide it.',
    es: 'Negocios, servicios, productos y oportunidades — dile a BuySide lo que necesitas y conéctate con personas que pueden proporcionarlo.',
  },
  'home.ctaStart': { en: 'Start Your Search', es: 'Comienza Tu Búsqueda' },
  'home.ctaList': { en: 'List What You Offer', es: 'Lista Lo Que Ofreces' },
  'home.heroFootnote': {
    en: 'Find what you need. Connect with the right people. Get introduced.',
    es: 'Encuentra lo que necesitas. Conéctate con las personas adecuadas. Sé presentado.',
  },

  // Home - What are you looking for
  'home.whatEyebrow': { en: 'WHAT ARE YOU LOOKING FOR?', es: '¿QUÉ ESTÁS BUSCANDO?' },
  'home.whatTitle': { en: 'Tell us what you need.', es: 'Dinos lo que necesitas.' },
  'home.whatDesc': {
    en: 'Pick a category below and create a request. The BuySide network will help you find it.',
    es: 'Elige una categoría y crea una solicitud. La red BuySide te ayudará a encontrarlo.',
  },
  'home.findBusiness': { en: 'Find a Business', es: 'Encontrar un Negocio' },
  'home.findBusinessDesc': { en: 'Looking to acquire or invest in a business.', es: 'Buscando adquirir o invertir en un negocio.' },
  'home.findService': { en: 'Find a Service', es: 'Encontrar un Servicio' },
  'home.findServiceDesc': { en: 'Looking for professional or business services.', es: 'Buscando servicios profesionales o empresariales.' },
  'home.findProduct': { en: 'Find a Product', es: 'Encontrar un Producto' },
  'home.findProductDesc': { en: 'Looking for products, suppliers, or sourcing opportunities.', es: 'Buscando productos, proveedores u oportunidades de abastecimiento.' },
  'home.examples': { en: 'Examples', es: 'Ejemplos' },

  // Home - Have something
  'home.offerEyebrow': { en: 'OFFER WHAT YOU HAVE', es: 'OFRECE LO QUE TIENES' },
  'home.offerTitle': { en: 'Have Something People Are Looking For?', es: '¿Tienes Algo Que La Gente Busca?' },
  'home.offerBody': {
    en: 'List what you can offer and connect with people who are actively looking for it.',
    es: 'Lista lo que puedes ofrecer y conéctate con personas que lo están buscando activamente.',
  },
  'home.aBusiness': { en: 'A Business', es: 'Un Negocio' },
  'home.aService': { en: 'A Service', es: 'Un Servicio' },
  'home.aProduct': { en: 'A Product', es: 'Un Producto' },
  'home.aBusinessDesc': { en: 'List a business for sale or investment.', es: 'Lista un negocio en venta o inversión.' },
  'home.aServiceDesc': { en: 'Offer professional or business services.', es: 'Ofrece servicios profesionales o empresariales.' },
  'home.aProductDesc': { en: 'List products, supplies, or sourcing opportunities.', es: 'Lista productos, suministros u oportunidades de abastecimiento.' },

  // Home - How it works
  'home.howEyebrow': { en: 'HOW IT WORKS', es: 'CÓMO FUNCIONA' },
  'home.howTitle': { en: 'Simple steps to find what you need.', es: 'Pasos simples para encontrar lo que necesitas.' },
  'home.step1Title': { en: 'Tell us what you need', es: 'Dinos lo que necesitas' },
  'home.step1Desc': { en: 'Create a request describing what you need — a business, a service, or a product.', es: 'Crea una solicitud describiendo lo que necesitas — un negocio, un servicio o un producto.' },
  'home.step2Title': { en: 'Get matched', es: 'Obtén coincidencias' },
  'home.step2Desc': { en: 'BuySide shows your request to people who can help — sellers, providers, brokers, and suppliers.', es: 'BuySide muestra tu solicitud a personas que pueden ayudar — vendedores, proveedores, corredores y suministradores.' },
  'home.step3Title': { en: 'Review responses', es: 'Revisa las respuestas' },
  'home.step3Desc': { en: 'People who have what you need can submit a match. You review each one and decide.', es: 'Personas que tienen lo que necesitas pueden enviar una coincidencia. Tú revisas cada una y decides.' },
  'home.step4Title': { en: 'Connect', es: 'Conecta' },
  'home.step4Desc': { en: 'When you find the right match, BuySide facilitates the introduction.', es: 'Cuando encuentres la coincidencia adecuada, BuySide facilita la presentación.' },

  // Home - For both sides
  'home.forEveryone': { en: 'For everyone', es: 'Para todos' },
  'home.builtForBoth': { en: 'Built for both sides of a connection.', es: 'Diseñado para ambos lados de una conexión.' },
  'home.lookingForSomething': { en: 'Looking for something', es: 'Buscando algo' },
  'home.lookingForSomethingDesc': {
    en: 'Post a request and let the network find it. Receive relevant matches without broadcasting your needs across the market.',
    es: 'Publica una solicitud y deja que la red la encuentre. Recibe coincidencias relevantes sin difundir tus necesidades por todo el mercado.',
  },
  'home.haveSomethingToOffer': { en: 'Have something to offer', es: 'Tienes algo que ofrecer' },
  'home.haveSomethingToOfferDesc': {
    en: 'Browse requests and submit a match when you have what someone is looking for. Brokers, owners, advisors, and suppliers welcome.',
    es: 'Explora solicitudes y envía una coincidencia cuando tengas lo que alguien busca. Corredores, propietarios, asesores y proveedores son bienvenidos.',
  },
  'home.howItWorks': { en: 'How it works', es: 'Cómo funciona' },
  'home.howToRespond': { en: 'How to respond', es: 'Cómo responder' },

  // Dashboard
  'dash.eyebrow': { en: 'Member dashboard', es: 'Panel del miembro' },
  'dash.title': { en: 'Your Opportunity Network', es: 'Tu Red de Oportunidades' },
  'dash.subtitle': {
    en: 'Discover requests, submit matches, and turn the right connections into opportunities.',
    es: 'Descubre solicitudes, presenta conexiones y convierte los contactos adecuados en oportunidades.',
  },
  'dash.createRequest': { en: 'Create a Request', es: 'Crear una Solicitud' },

  // Dashboard metrics
  'dash.metricRequests': { en: 'Requests', es: 'Solicitudes' },
  'dash.metricRequestsNote': { en: 'Published requests', es: 'Solicitudes publicadas' },
  'dash.metricMatches': { en: 'Matches', es: 'Matches' },
  'dash.metricMatchesNote': { en: 'Matches shared', es: 'Matches enviados' },
  'dash.metricSaved': { en: 'Saved', es: 'Guardados' },
  'dash.metricSavedNote': { en: 'Saved requests', es: 'Solicitudes guardadas' },
  'dash.metricReviews': { en: 'Reviews', es: 'Revisiones' },
  'dash.metricReviewsNote': { en: 'Items needing attention', es: 'Elementos que necesitan atención' },
  'dash.metricIntroductions': { en: 'Introductions', es: 'Presentaciones' },
  'dash.metricIntroductionsNote': { en: 'Not tracked until billing is active', es: 'No se rastrean hasta que la facturación esté activa' },

  // Dashboard tabs
  'dash.tabMyRequests': { en: 'My Requests', es: 'Mis Solicitudes' },
  'dash.tabMyMatches': { en: 'My Matches', es: 'Mis Matches' },
  'dash.tabSaved': { en: 'Saved', es: 'Guardados' },

  // Dashboard empty states
  'dash.noRequests': { en: 'No requests yet', es: 'No hay solicitudes aún' },
  'dash.noRequestsBody': { en: 'Create a request when you are ready to find what you need.', es: 'Crea una solicitud cuando estés listo para encontrar lo que necesitas.' },
  'dash.noMatches': { en: 'No matches submitted', es: 'No hay matches enviados' },
  'dash.noMatchesBody': { en: 'Find a request that fits what you have to offer.', es: 'Encuentra una solicitud que se ajuste a lo que tienes para ofrecer.' },
  'dash.noSaved': { en: 'No saved requests', es: 'No hay solicitudes guardadas' },
  'dash.noSavedBody': { en: 'Save a request when you want to return to it later.', es: 'Guarda una solicitud cuando quieras volver a ella más tarde.' },

  // Dashboard showcase
  'dash.showcaseHeading': { en: 'Your Opportunity Network', es: 'Tu Red de Oportunidades' },
  'dash.showcaseSubheading': {
    en: 'Discover what people can find, source, buy, sell, and connect through BuySide.',
    es: 'Descubre lo que puedes encontrar, conseguir, comprar, vender y conectar a través de BuySide.',
  },
  'dash.showcaseSectionTitle': { en: 'Explore BuySide', es: 'Explora BuySide' },
  'dash.showcaseSupportingCopy': {
    en: 'Examples of what you can find through the network.',
    es: 'Ejemplos de lo que puedes encontrar a través de la red.',
  },
  'dash.demoLabel': { en: 'DEMO EXAMPLE', es: 'EJEMPLO DEMO' },
  'dash.showcaseCtaText': { en: 'Looking for something specific?', es: '¿Buscas algo específico?' },
  'dash.showcaseCtaButton': { en: 'POST A REQUEST', es: 'PUBLICAR UNA SOLICITUD' },

  // Requests marketplace
  'requests.eyebrow': { en: 'Request marketplace', es: 'Mercado de solicitudes' },
  'requests.title': { en: 'Requests', es: 'Solicitudes' },
  'requests.intro': {
    en: 'Browse public requests from people looking for businesses, services, and products. Submit a match if you have what they need.',
    es: 'Explora solicitudes públicas de personas que buscan negocios, servicios y productos. Envía una coincidencia si tienes lo que necesitan.',
  },
  'requests.postRequest': { en: 'Post a Request', es: 'Publicar una Solicitud' },
  'requests.searchLabel': { en: 'Search criteria', es: 'Criterios de búsqueda' },
  'requests.searchPlaceholder': { en: 'Industry, title or profile', es: 'Industria, título o perfil' },
  'requests.industry': { en: 'Industry', es: 'Industria' },
  'requests.industryPlaceholder': { en: 'Any industry', es: 'Cualquier industria' },
  'requests.location': { en: 'Location', es: 'Ubicación' },
  'requests.purchasePrice': { en: 'Purchase price (USD)', es: 'Precio de compra (USD)' },
  'requests.buyerType': { en: 'Buyer type', es: 'Tipo de comprador' },
  'requests.anyBuyerType': { en: 'Any buyer type', es: 'Cualquier tipo de comprador' },
  'requests.sortBy': { en: 'Sort by', es: 'Ordenar por' },
  'requests.sortNewest': { en: 'Recently published', es: 'Recién publicadas' },
  'requests.sortHighestBudget': { en: 'Highest budget', es: 'Presupuesto más alto' },
  'requests.sortHighestReward': { en: 'Highest finder fee', es: 'Comisión más alta' },
  'requests.sortClosingSoon': { en: 'Closing soon', es: 'Cierra pronto' },
  'requests.verifiedOnly': { en: 'Verified buyers only', es: 'Solo compradores verificados' },
  'requests.retrieving': { en: 'Retrieving requests', es: 'Recuperando solicitudes' },
  'requests.privacyPrinciples': { en: 'Privacy principles', es: 'Principios de privacidad' },
  'requests.noMatch': { en: 'No criteria match these filters', es: 'Ningún criterio coincide con estos filtros' },
  'requests.noMatchBody': {
    en: 'Try a broader location or budget, or clear a search term to see more requests.',
    es: 'Prueba con una ubicación o presupuesto más amplio, o borra un término de búsqueda para ver más solicitudes.',
  },
  'requests.clearFilters': { en: 'Clear filters', es: 'Limpiar filtros' },

  // Post request
  'postRequest.eyebrow': { en: 'Create a Request', es: 'Crear una Solicitud' },
  'postRequest.title': { en: 'What are you looking for?', es: '¿Qué estás buscando?' },
  'postRequest.intro': { en: 'Tell us what you need. The BuySide network will help you find it.', es: 'Dinos lo que necesitas. La red BuySide te ayudará a encontrarlo.' },
  'postRequest.backHome': { en: 'Back to home', es: 'Volver al inicio' },
  'postRequest.titleLabel': { en: 'What are you looking for?', es: '¿Qué estás buscando?' },
  'postRequest.titlePlaceholder': { en: 'For example: HVAC company in Florida', es: 'Por ejemplo: Empresa HVAC en Florida' },
  'postRequest.category': { en: 'Category', es: 'Categoría' },
  'postRequest.selectCategory': { en: 'Select a category', es: 'Selecciona una categoría' },
  'postRequest.location': { en: 'Location', es: 'Ubicación' },
  'postRequest.country': { en: 'Country', es: 'País' },
  'postRequest.region': { en: 'Region or state', es: 'Región o estado' },
  'postRequest.city': { en: 'City', es: 'Ciudad' },
  'postRequest.remote': { en: 'Open to remote or location-flexible options', es: 'Abierto a opciones remotas o de ubicación flexible' },
  'postRequest.budget': { en: 'Budget or price range', es: 'Presupuesto o rango de precio' },
  'postRequest.minimum': { en: 'Minimum (USD)', es: 'Mínimo (USD)' },
  'postRequest.maximum': { en: 'Maximum (USD)', es: 'Máximo (USD)' },
  'postRequest.description': { en: 'Description', es: 'Descripción' },
  'postRequest.descriptionPlaceholder': { en: "Describe what you're looking for in detail.", es: 'Describe lo que buscas en detalle.' },
  'postRequest.timeline': { en: 'Timeline', es: 'Plazo' },
  'postRequest.timelinePlaceholder': { en: 'For example: Actively looking', es: 'Por ejemplo: Buscando activamente' },
  'postRequest.contactPrefs': { en: 'Contact preferences', es: 'Preferencias de contacto' },
  'postRequest.privacyPublic': { en: 'Public — appears in marketplace', es: 'Público — aparece en el mercado' },
  'postRequest.privacyMembers': { en: 'Members only', es: 'Solo miembros' },
  'postRequest.privacyNda': { en: 'NDA required', es: 'Se requiere NDA' },
  'postRequest.privacyPrivate': { en: 'Private — not listed publicly', es: 'Privado — no listado públicamente' },
  'postRequest.publish': { en: 'Publish Request', es: 'Publicar Solicitud' },
  'postRequest.publishing': { en: 'Publishing…', es: 'Publicando…' },
  'postRequest.submitPrivate': { en: 'Submit Private Request', es: 'Enviar Solicitud Privada' },
  'postRequest.error': { en: 'Your request could not be published. Please review the fields and try again.', es: 'Tu solicitud no pudo ser publicada. Revisa los campos e inténtalo de nuevo.' },
  'postRequest.tips': { en: 'Tips', es: 'Consejos' },
  'postRequest.tip1': { en: 'Choose a visibility level that fits your needs.', es: 'Elige un nivel de visibilidad que se ajuste a tus necesidades.' },
  'postRequest.tip2': { en: 'You can leave budget fields blank if flexible.', es: 'Puedes dejar los campos de presupuesto en blanco si es flexible.' },
  'postRequest.tip3': { en: 'Avoid including personal or confidential information.', es: 'Evita incluir información personal o confidencial.' },

  // Submit match
  'submitMatch.eyebrow': { en: 'Submit a Match', es: 'Enviar una Coincidencia' },
  'submitMatch.title': { en: 'Submit a match to this request.', es: 'Envía una coincidencia a esta solicitud.' },
  'submitMatch.intro': {
    en: 'Share enough context for the requester to assess fit. Do not disclose confidential information without authorization.',
    es: 'Comparte suficiente contexto para que el solicitante evalúe el ajuste. No divulgues información confidencial sin autorización.',
  },
  'submitMatch.reviewRequest': { en: 'Review request', es: 'Revisar solicitud' },
  'submitMatch.businessOverview': { en: 'Business overview', es: 'Resumen del negocio' },
  'submitMatch.businessName': { en: 'Business name', es: 'Nombre del negocio' },
  'submitMatch.businessNameOptional': { en: '(optional)', es: '(opcional)' },
  'submitMatch.industry': { en: 'Industry', es: 'Industria' },
  'submitMatch.location': { en: 'Location', es: 'Ubicación' },
  'submitMatch.askingPrice': { en: 'Asking price (USD)', es: 'Precio de venta (USD)' },
  'submitMatch.annualRevenue': { en: 'Annual revenue', es: 'Ingresos anuales' },
  'submitMatch.ebitda': { en: 'EBITDA', es: 'EBITDA' },
  'submitMatch.cashFlow': { en: 'Cash flow', es: 'Flujo de caja' },
  'submitMatch.employees': { en: 'Employees', es: 'Empleados' },
  'submitMatch.yearsOperating': { en: 'Years operating', es: 'Años de operación' },
  'submitMatch.shortDesc': { en: 'Short business description', es: 'Breve descripción del negocio' },
  'submitMatch.matchRationale': { en: "Why this fits the buyer's criteria", es: 'Por qué esto se ajusta a los criterios del comprador' },
  'submitMatch.yourRelationship': { en: 'Your relationship', es: 'Tu relación' },
  'submitMatch.relationship': { en: 'Your relationship to the opportunity', es: 'Tu relación con la oportunidad' },
  'submitMatch.ownerContact': { en: 'Owner contact status', es: 'Estado de contacto del propietario' },
  'submitMatch.brokerStatus': { en: 'Broker status', es: 'Estado del corredor' },
  'submitMatch.confidential': { en: 'Keep the business identity confidential in this initial submission.', es: 'Mantener la identidad del negocio confidencial en esta presentación inicial.' },
  'submitMatch.submit': { en: 'Submit a Match', es: 'Enviar una Coincidencia' },
  'submitMatch.submitting': { en: 'Submitting…', es: 'Enviando…' },
  'submitMatch.submitted': { en: 'Match submitted', es: 'Coincidencia enviada' },
  'submitMatch.submittedTitle': { en: 'Your match is in review.', es: 'Tu coincidencia está en revisión.' },
  'submitMatch.submittedBody': {
    en: 'The requester can review your submission against their criteria. Any next step will depend on their review.',
    es: 'El solicitante puede revisar tu envío contra sus criterios. Cualquier próximo paso dependerá de su revisión.',
  },
  'submitMatch.goToDashboard': { en: 'Go to dashboard', es: 'Ir al panel' },
  'submitMatch.requestDetails': { en: 'Request details', es: 'Detalles de la solicitud' },
  'submitMatch.seeFullCriteria': { en: 'See full criteria', es: 'Ver criterios completos' },
  'submitMatch.sampleRequest': { en: 'SAMPLE REQUEST', es: 'SOLICITUD DE EJEMPLO' },

  // Request detail
  'requestDetail.allRequests': { en: 'All requests', es: 'Todas las solicitudes' },
  'requestDetail.details': { en: 'Request details', es: 'Detalles de la solicitud' },
  'requestDetail.geography': { en: 'Geography', es: 'Geografía' },
  'requestDetail.flexible': { en: 'Flexible', es: 'Flexible' },
  'requestDetail.purchaseRange': { en: 'Purchase range', es: 'Rango de compra' },
  'requestDetail.targetRevenue': { en: 'Target revenue', es: 'Ingresos objetivo' },
  'requestDetail.ebitdaReq': { en: 'EBITDA / SDE requirement', es: 'Requisito de EBITDA / SDE' },
  'requestDetail.cashFlow': { en: 'Cash flow', es: 'Flujo de caja' },
  'requestDetail.timing': { en: 'Timing', es: 'Tiempo' },
  'requestDetail.notSpecified': { en: 'Not specified', es: 'No especificado' },
  'requestDetail.detailsText': { en: 'Details', es: 'Detalles' },
  'requestDetail.exclusions': { en: 'Exclusions', es: 'Exclusiones' },
  'requestDetail.confidentiality': { en: 'Confidentiality', es: 'Confidencialidad' },
  'requestDetail.haveMatch': { en: 'Have something that matches?', es: '¿Tienes algo que coincida?' },
  'requestDetail.submitMatchTo': { en: 'Submit a match to this request.', es: 'Envía una coincidencia a esta solicitud.' },
  'requestDetail.submitMatchDesc': {
    en: 'Share what you have and your relationship to it. Identifying details can remain confidential at submission.',
    es: 'Comparte lo que tienes y tu relación con ello. Los detalles identificativos pueden permanecer confidenciales en el envío.',
  },
  'requestDetail.saveCriteria': { en: 'Save criteria', es: 'Guardar criterios' },
  'requestDetail.removeSaved': { en: 'Remove saved criteria', es: 'Eliminar criterios guardados' },
  'requestDetail.saving': { en: 'Saving…', es: 'Guardando…' },
  'requestDetail.signInToSave': { en: 'Sign in to save', es: 'Inicia sesión para guardar' },
  'requestDetail.monthlyLimit': { en: 'Monthly Free limit reached', es: 'Límite mensual gratuito alcanzado' },
  'requestDetail.limitTitle': { en: 'You have opened 5 different requests this month.', es: 'Has abierto 5 solicitudes diferentes este mes.' },
  'requestDetail.limitBody': {
    en: 'Your Free allowance is 5 distinct request details per UTC calendar month. It renews at the start of the next month. Paid plans are listed, but checkout is currently unavailable.',
    es: 'Tu asignación gratuita es de 5 detalles de solicitud distintos por mes calendario UTC. Se renueva al inicio del próximo mes. Los planes de pago están listados, pero el pago no está disponible actualmente.',
  },
  'requestDetail.viewPlans': { en: 'View plan options', es: 'Ver opciones de plan' },

  // Error/Loading states
  'error.unableToLoad': { en: 'Unable to load this information', es: 'No se pudo cargar esta información' },
  'error.tryAgain': { en: 'Please try again in a moment.', es: 'Por favor, inténtalo de nuevo en un momento.' },
  'error.retry': { en: 'Retry', es: 'Reintentar' },

  // Opportunities page
  'opportunities.eyebrow': { en: 'Opportunities', es: 'Oportunidades' },
  'opportunities.title': { en: 'Browse opportunities', es: 'Explorar oportunidades' },
  'opportunities.intro': {
    en: "People are looking for businesses, services, and products. Browse their requests and submit a match if you have what they need.",
    es: 'Personas buscan negocios, servicios y productos. Explora sus solicitudes y envía una coincidencia si tienes lo que necesitan.',
  },
  'opportunities.browseRequests': { en: 'Browse Requests', es: 'Explorar Solicitudes' },
  'opportunities.noneYet': { en: 'No opportunities listed yet', es: 'Aún no hay oportunidades listadas' },
  'opportunities.noneYetBody': {
    en: "When people post requests for businesses, services, or products, you'll find them here. Browse current requests to see if you can help.",
    es: 'Cuando las personas publiquen solicitudes de negocios, servicios o productos, las encontrarás aquí. Explora las solicitudes actuales para ver si puedes ayudar.',
  },

  // Compliance
  'compliance.text': {
    en: 'BuySide is a technology and introduction platform. Certain activities, transactions, referral compensation, business brokerage, real estate transactions, securities transactions, financing activities, and other regulated activities may require licensed professionals depending on the transaction structure and jurisdiction. BuySide does not represent that every user or transaction is eligible for finder compensation.',
    es: 'BuySide es una plataforma de tecnología e introducciones. Ciertas actividades, transacciones, compensación por referencias, corretaje empresarial, transacciones inmobiliarias, transacciones de valores, actividades de financiamiento y otras actividades reguladas pueden requerir profesionales con licencia según la estructura de la transacción y la jurisdicción. BuySide no representa que cada usuario o transacción sea elegible para compensación de buscador.',
  },

  // Privacy note
  'privacy.note': {
    en: 'Information is shared only with the buyer in connection with this opportunity, subject to the stated privacy terms.',
    es: 'La información se comparte solo con el comprador en relación con esta oportunidad, sujeto a los términos de privacidad establecidos.',
  },
  'privacy.noteSubmit': {
    en: 'Do not include identifiable information in an initial submission unless you are authorized to share it and the owner has agreed.',
    es: 'No incluyas información identificable en un envío inicial a menos que estés autorizado a compartirla y el propietario haya acordado.',
  },
  'privacy.noteReward': {
    en: 'Potential finder rewards are subject to the request\'s disclosure, eligibility, buyer acceptance and any separate agreement. No reward is guaranteed.',
    es: 'Las posibles recompensas del buscador están sujetas a la divulgación de la solicitud, la elegibilidad, la aceptación del comprador y cualquier acuerdo separado. No se garantiza ninguna recompensa.',
  },
  'privacy.noteDashboard': {
    en: 'Request visibility and submission statuses are shown as returned by the platform. Any progress depends on participants and is not guaranteed.',
    es: 'La visibilidad de la solicitud y los estados de envío se muestran como los devuelve la plataforma. Cualquier progreso depende de los participantes y no está garantizado.',
  },

  // Account plan
  'plan.title': { en: 'Membership', es: 'Membresía' },
  'plan.free': { en: 'Free plan', es: 'Plan gratuito' },
  'plan.viewsUsed': { en: 'request views used this month', es: 'vistas de solicitud usadas este mes' },
  'plan.submissionsUsed': { en: 'match submissions used this month', es: 'envíos de coincidencia usados este mes' },
  'plan.upgrade': { en: 'Upgrade', es: 'Mejorar' },
  'plan.viewPlans': { en: 'View plans', es: 'Ver planes' },

  // Finder fee
  'finderFee.label': { en: 'Finder Fee', es: 'Comisión del Buscador' },
  'finderFee.default': {
    en: 'Not specified. Confirm the fee and terms with the buyer before making an introduction.',
    es: 'No especificado. Confirma la comisión y los términos con el comprador antes de hacer una presentación.',
  },
  'finderFee.disclaimer': {
    en: 'Any fee is subject to eligibility, buyer acceptance, applicable law and a separate written agreement. It is not guaranteed.',
    es: 'Cualquier comisión está sujeta a elegibilidad, aceptación del comprador, ley aplicable y un acuerdo por escrito separado. No está garantizada.',
  },

  // Request card
  'card.viewFullRequest': { en: 'VIEW FULL REQUEST', es: 'VER SOLICITUD COMPLETA' },
  'card.submitMatch': { en: 'SUBMIT A MATCH', es: 'ENVIAR COINCIDENCIA' },
  'card.sampleRequest': { en: 'Sample Request', es: 'Solicitud de Ejemplo' },
  'card.activeBuyer': { en: 'Active Buyer Mandate', es: 'Mandato de Comprador Activo' },
  'card.activelySearching': { en: 'Actively Searching', es: 'Buscando Activamente' },
  'card.flexibleRange': { en: 'Flexible acquisition range', es: 'Rango de adquisición flexible' },
  'card.upTo': { en: 'Up to', es: 'Hasta' },
  'card.from': { en: 'From', es: 'Desde' },
  'card.locationFlexible': { en: 'Location flexible', es: 'Ubicación flexible' },
  'card.remoteConsidered': { en: 'Remote considered', es: 'Remoto considerado' },
  'card.purchasePrice': { en: 'Purchase price', es: 'Precio de compra' },
  'card.targetRevenue': { en: 'Target revenue', es: 'Ingresos objetivo' },
  'card.ebitdaSde': { en: 'EBITDA / SDE requirement', es: 'Requisito de EBITDA / SDE' },
  'card.timeline': { en: 'Acquisition timeline', es: 'Plazo de adquisición' },
  'card.keyCriteria': { en: 'Key acquisition criteria', es: 'Criterios clave de adquisición' },
  'card.exclusions': { en: 'Exclusions', es: 'Exclusiones' },
  'card.noneSpecified': { en: 'None specified.', es: 'Ninguna especificada.' },
  'card.notSpecified': { en: 'Not specified', es: 'No especificado' },

  // Dashboard match review
  'dashReview.privateIntroductions': { en: 'Private introductions', es: 'Presentaciones privadas' },
  'dashReview.couldNotLoad': { en: 'Could not load introductions. Retry.', es: 'No se pudieron cargar las presentaciones. Reintentar.' },
  'dashReview.noIntroductions': { en: 'No introductions are available for review yet.', es: 'Aún no hay presentaciones disponibles para revisión.' },
  'dashReview.identityWithheld': { en: 'Identity withheld', es: 'Identidad oculta' },
  'dashReview.confidentialOpp': { en: 'Confidential opportunity', es: 'Oportunidad confidencial' },
  'dashReview.submitted': { en: 'Submitted', es: 'Enviado' },
  'dashReview.request': { en: 'Request:', es: 'Solicitud:' },
  'dashReview.viewRequest': { en: 'View request', es: 'Ver solicitud' },
  'dashReview.removeSaved': { en: 'Remove saved', es: 'Eliminar guardado' },
  'dashReview.removing': { en: 'Removing…', es: 'Eliminando…' },

  // Editorial pages
  'editorial.consideredApproach': { en: 'A considered approach', es: 'Un enfoque considerado' },

  // For Buyers
  'forBuyers.eyebrow': { en: 'For people looking for something', es: 'Para personas que buscan algo' },
  'forBuyers.title': { en: 'Make your request work harder.', es: 'Haz que tu solicitud trabaje más.' },
  'forBuyers.intro': {
    en: 'BuySide gives you a clear, discreet way to describe what you need — a business, a service, or a product — and a place for the right people to find you.',
    es: 'BuySide te ofrece una forma clara y discreta de describir lo que necesitas — un negocio, un servicio o un producto — y un lugar para que las personas adecuadas te encuentren.',
  },
  'forBuyers.cta': { en: 'Create a Request', es: 'Crear una Solicitud' },
  'forBuyers.b1Title': { en: 'Be specific, not exposed', es: 'Sé específico, no expuesto' },
  'forBuyers.b1Body': {
    en: 'Set the sectors, business profile, geography, financial parameters and timing you are genuinely prepared to consider. Publish only at the privacy level that fits.',
    es: 'Establece los sectores, perfil empresarial, geografía, parámetros financieros y plazos que estás genuinamente dispuesto a considerar. Publica solo en el nivel de privacidad que corresponda.',
  },
  'forBuyers.b2Title': { en: 'Receive context with the introduction', es: 'Recibe contexto con la presentación' },
  'forBuyers.b2Body': {
    en: "Submissions can include the business profile, fit rationale and the submitter's relationship to the opportunity. Review what is shared before deciding whether to engage.",
    es: 'Los envíos pueden incluir el perfil del negocio, la justificación del ajuste y la relación del remitente con la oportunidad. Revisa lo que se comparte antes de decidir si participar.',
  },
  'forBuyers.b3Title': { en: 'Stay in control', es: 'Mantén el control' },
  'forBuyers.b3Body': {
    en: 'Your request is not a public listing of your identity. You decide whether a potential match should move forward, and what information to share next.',
    es: 'Tu solicitud no es una lista pública de tu identidad. Tú decides si una coincidencia potencial debe avanzar y qué información compartir a continuación.',
  },
  'forBuyers.disclaimer': {
    en: 'BuySide does not represent buyers, negotiate transactions, or provide investment, legal, tax or accounting advice. All acquisition decisions remain yours.',
    es: 'BuySide no representa a compradores, negocia transacciones ni proporciona asesoramiento de inversión, legal, fiscal o contable. Todas las decisiones de adquisición son tuyas.',
  },

  // For Finders
  'forFinders.eyebrow': { en: 'For people who have something to offer', es: 'Para personas que tienen algo que ofrecer' },
  'forFinders.title': { en: 'A well-placed match can matter.', es: 'Una coincidencia bien colocada puede importar.' },
  'forFinders.intro': {
    en: 'Bring forward what you have when it matches someone\'s request. BuySide is designed for informed, relationship-aware introductions—not anonymous lead generation.',
    es: 'Presenta lo que tienes cuando coincide con la solicitud de alguien. BuySide está diseñado para presentaciones informadas y conscientes de las relaciones, no para generación de leads anónima.',
  },
  'forFinders.cta': { en: 'Browse Requests', es: 'Explorar Solicitudes' },
  'forFinders.b1Title': { en: 'Who may submit', es: 'Quién puede enviar' },
  'forFinders.b1Body': {
    en: 'Business owners, brokers, M&A advisors, accountants, attorneys and other deal finders may submit a potential match when they are authorized to share the information and can explain their connection.',
    es: 'Propietarios de negocios, corredores, asesores de M&A, contadores, abogados y otros buscadores de oportunidades pueden enviar una coincidencia potencial cuando están autorizados a compartir la información y pueden explicar su conexión.',
  },
  'forFinders.b2Title': { en: 'Confidentiality comes first', es: 'La confidencialidad primero' },
  'forFinders.b2Body': {
    en: 'Start with non-identifying business context unless the owner has authorized disclosure. Avoid sharing personal information, client materials or confidential documents without permission.',
    es: 'Comienza con contexto empresarial no identificativo a menos que el propietario haya autorizado la divulgación. Evita compartir información personal, materiales de clientes o documentos confidenciales sin permiso.',
  },
  'forFinders.b3Title': { en: 'A potential success-based reward', es: 'Una posible recompensa basada en el éxito' },
  'forFinders.b3Body': {
    en: 'Qualified introductions that result in completed transactions may earn a success-based reward of up to 8% of the final transaction value, subject to applicable terms, transaction structure, licensing requirements, and jurisdiction.',
    es: 'Las presentaciones calificadas que resulten en transacciones completadas pueden generar una recompensa basada en el éxito de hasta el 8% del valor final de la transacción, sujeto a los términos aplicables, la estructura de la transacción, los requisitos de licencia y la jurisdicción.',
  },
  'forFinders.noClosing': { en: 'No closing. No finder reward.', es: 'Sin cierre. Sin recompensa de buscador.' },
  'forFinders.caution1': {
    en: 'Reward eligibility, amount, payment timing, and legal requirements vary by transaction, structure, jurisdiction, and participant status. Terms must be confirmed before an introduction or submission.',
    es: 'La elegibilidad de recompensa, el monto, el momento del pago y los requisitos legales varían según la transacción, la estructura, la jurisdicción y el estado del participante. Los términos deben confirmarse antes de una presentación o envío.',
  },
  'forFinders.caution2': {
    en: 'No reward is promised or guaranteed. Any compensation depends on applicable terms, transaction structure, licensing requirements, jurisdiction and a separate agreement.',
    es: 'No se promete ni garantiza ninguna recompensa. Cualquier compensación depende de los términos aplicables, la estructura de la transacción, los requisitos de licencia, la jurisdicción y un acuerdo separado.',
  },

  // How it works
  'howItWorks.eyebrow': { en: 'How it works', es: 'Cómo funciona' },
  'howItWorks.title': { en: 'A simple path from request to connection.', es: 'Un camino simple de solicitud a conexión.' },
  'howItWorks.intro': {
    en: 'The process begins with what you need. Each party can assess relevance before deciding whether to share more.',
    es: 'El proceso comienza con lo que necesitas. Cada parte puede evaluar la relevancia antes de decidir si compartir más.',
  },
  'howItWorks.cta': { en: 'Browse Requests', es: 'Explorar Solicitudes' },
  'howItWorks.b1Title': { en: 'Someone posts a request', es: 'Alguien publica una solicitud' },
  'howItWorks.b1Body': {
    en: 'A person defines what they need — a business, service, or product — with location, budget, and timeline. Privacy settings determine how the request is presented.',
    es: 'Una persona define lo que necesita — un negocio, servicio o producto — con ubicación, presupuesto y plazo. La configuración de privacidad determina cómo se presenta la solicitud.',
  },
  'howItWorks.b2Title': { en: 'Someone submits a match', es: 'Alguien envía una coincidencia' },
  'howItWorks.b2Body': {
    en: "A person who has what's needed provides context, explains why it fits and states their relationship to it. Initial identity details can be kept confidential.",
    es: 'Una persona que tiene lo necesario proporciona contexto, explica por qué encaja y declara su relación con ello. Los detalles de identidad iniciales pueden mantenerse confidenciales.',
  },
  'howItWorks.b3Title': { en: 'The requester reviews the match', es: 'El solicitante revisa la coincidencia' },
  'howItWorks.b3Body': {
    en: 'The requester reviews potential matches against what they asked for. Submissions are not endorsements, verified details, or a promise of follow-up.',
    es: 'El solicitante revisa las coincidencias potenciales contra lo que solicitó. Los envíos no son aprobaciones, detalles verificados ni una promesa de seguimiento.',
  },
  'howItWorks.b4Title': { en: 'Participants decide what comes next', es: 'Los participantes deciden qué sigue' },
  'howItWorks.b4Body': {
    en: 'If there is mutual interest, the parties can establish appropriate confidentiality, confirm representation and agree directly on next steps. BuySide does not negotiate the transaction.',
    es: 'Si hay interés mutuo, las partes pueden establecer la confidencialidad adecuada, confirmar la representación y acordar directamente los próximos pasos. BuySide no negocia la transacción.',
  },

  // Private Network
  'privateNetwork.eyebrow': { en: 'A private network', es: 'Una red privada' },
  'privateNetwork.title': { en: 'A better setting for serious intent.', es: 'Un mejor entorno para intenciones serias.' },
  'privateNetwork.intro': {
    en: 'BuySide connects stated acquisition demand with people who may know a relevant business. It is not an open directory of businesses, buyers or intermediaries.',
    es: 'BuySide conecta la demanda de adquisición declarada con personas que pueden conocer un negocio relevante. No es un directorio abierto de negocios, compradores o intermediarios.',
  },
  'privateNetwork.cta': { en: 'Review published criteria', es: 'Revisar criterios publicados' },
  'privateNetwork.b1Title': { en: 'Acquisition buyers', es: 'Compradores de adquisiciones' },
  'privateNetwork.b1Body': {
    en: 'Strategic acquirers, individual buyers, private equity firms, search funds and other qualified buyers may describe their criteria, subject to platform access and request settings.',
    es: 'Adquirentes estratégicos, compradores individuales, firmas de capital privado, fondos de búsqueda y otros compradores calificados pueden describir sus criterios, sujetos al acceso a la plataforma y la configuración de solicitudes.',
  },
  'privateNetwork.b2Title': { en: 'Owners and operators', es: 'Propietarios y operadores' },
  'privateNetwork.b2Body': {
    en: "Owners can learn whether a buyer's stated criteria align before choosing to share information or enter a conversation.",
    es: 'Los propietarios pueden saber si los criterios declarados de un comprador se alinean antes de elegir compartir información o entrar en una conversación.',
  },
  'privateNetwork.b3Title': { en: 'Brokers and advisors', es: 'Corredores y asesores' },
  'privateNetwork.b3Body': {
    en: 'Intermediaries can surface a relevant mandate to a client opportunity when authorized, while keeping roles and relationships clear.',
    es: 'Los intermediarios pueden presentar un mandato relevante a una oportunidad del cliente cuando están autorizados, manteniendo claros los roles y las relaciones.',
  },
  'privateNetwork.b4Title': { en: 'Connected deal finders', es: 'Buscadores de oportunidades conectados' },
  'privateNetwork.b4Body': {
    en: 'People with a legitimate connection to a business may submit a potential match when they have permission to share appropriate information.',
    es: 'Personas con una conexión legítima a un negocio pueden enviar una coincidencia potencial cuando tienen permiso para compartir información apropiada.',
  },

  // Confidentiality
  'confidentiality.eyebrow': { en: 'Confidentiality', es: 'Confidencialidad' },
  'confidentiality.title': { en: 'Share deliberately. Keep control of identity.', es: 'Comparte deliberadamente. Mantén el control de la identidad.' },
  'confidentiality.intro': {
    en: 'Private introductions only work when information is handled with care. BuySide is designed to support selective disclosure—not to replace consent, legal agreements or professional judgment.',
    es: 'Las presentaciones privadas solo funcionan cuando la información se maneja con cuidado. BuySide está diseñado para apoyar la divulgación selectiva, no para reemplazar el consentimiento, los acuerdos legales o el juicio profesional.',
  },
  'confidentiality.cta': { en: 'Browse Requests', es: 'Explorar Solicitudes' },
  'confidentiality.b1Title': { en: 'Start with non-identifying context', es: 'Comienza con contexto no identificativo' },
  'confidentiality.b1Body': {
    en: 'A first submission can describe the sector, location, business scale and fit without naming a company or owner. Only include information you are authorized to share.',
    es: 'Un primer envío puede describir el sector, la ubicación, la escala del negocio y el ajuste sin nombrar una empresa o propietario. Solo incluye información que estás autorizado a compartir.',
  },
  'confidentiality.b2Title': { en: 'Consent before sensitive disclosure', es: 'Consentimiento antes de divulgación sensible' },
  'confidentiality.b2Body': {
    en: 'Do not upload or transmit trade secrets, personal data, financial records or confidential client materials without the necessary permission and safeguards. Use an NDA when appropriate.',
    es: 'No cargues ni transmitas secretos comerciales, datos personales, registros financieros o materiales confidenciales de clientes sin los permisos y salvaguardas necesarios. Usa un NDA cuando sea apropiado.',
  },
  'confidentiality.b3Title': { en: 'Privacy settings have limits', es: 'La configuración de privacidad tiene límites' },
  'confidentiality.b3Body': {
    en: 'Public, members-only, NDA-required and private request settings affect visibility. They do not guarantee anonymity or replace a signed confidentiality agreement.',
    es: 'Las configuraciones de solicitud pública, solo miembros, NDA requerido y privada afectan la visibilidad. No garantizan el anonimato ni reemplazan un acuerdo de confidencialidad firmado.',
  },
  'confidentiality.b4Title': { en: 'Make introductions with care', es: 'Haz presentaciones con cuidado' },
  'confidentiality.b4Body': {
    en: 'Participants are responsible for confirming authority, representation, permissions and applicable disclosure obligations before sharing information or proceeding.',
    es: 'Los participantes son responsables de confirmar la autoridad, representación, permisos y obligaciones de divulgación aplicables antes de compartir información o continuar.',
  },

  // Legal pages
  'legal.draftStatus': { en: 'Draft status', es: 'Estado de borrador' },
  'legal.draftStatusText': {
    en: 'This page is an initial draft and should be reviewed by counsel where appropriate before being relied upon as a complete policy or agreement.',
    es: 'Esta página es un borrador inicial y debe ser revisada por un abogado cuando corresponda antes de usarse como política o acuerdo completo.',
  },
  'legal.platformDisclaimer': { en: 'Platform disclaimer', es: 'Aviso de la plataforma' },
  'legal.platformDisclaimerText': {
    en: 'BuySide is a technology and introduction platform. Certain activities, transactions, referral compensation, business brokerage, real estate transactions, securities transactions, financing activities, and other regulated activities may require licensed professionals depending on the transaction structure and jurisdiction. BuySide does not represent that every user or transaction is eligible for finder compensation.',
    es: 'BuySide es una plataforma de tecnología e introducciones. Ciertas actividades, transacciones, compensación por referencias, corretaje empresarial, transacciones inmobiliarias, transacciones de valores, actividades de financiamiento y otras actividades reguladas pueden requerir profesionales con licencia según la estructura de la transacción y la jurisdicción. BuySide no representa que cada usuario o transacción sea elegible para compensación de buscador.',
  },

  // Terms of Use
  'terms.eyebrow': { en: 'Legal · initial draft', es: 'Legal · borrador inicial' },
  'terms.title': { en: 'Terms of Use', es: 'Términos de Uso' },
  'terms.intro': {
    en: 'A high-level draft for the BuySide technology and introduction platform. It is not a complete set of user terms.',
    es: 'Un borrador de alto nivel para la plataforma de tecnología e introducciones BuySide. No es un conjunto completo de términos de usuario.',
  },
  'terms.s1Title': { en: 'Platform purpose', es: 'Propósito de la plataforma' },
  'terms.s1Text': {
    en: 'BuySide lets buyers publish acquisition criteria and lets other participants submit potential business matches. The current interface supports public request browsing, private submissions, request visibility settings and member workspaces.',
    es: 'BuySide permite a los compradores publicar criterios de adquisición y a otros participantes enviar posibles coincidencias de negocios. La interfaz actual admite la exploración de solicitudes públicas, envíos privados, configuración de visibilidad de solicitudes y espacios de trabajo de miembros.',
  },
  'terms.s2Title': { en: 'Participant decisions', es: 'Decisiones de los participantes' },
  'terms.s2Text': {
    en: 'The product does not promise a response, transaction, verification, eligibility decision or outcome. The scope and conditions of a complete user agreement remain to be established and reviewed.',
    es: 'El producto no promete una respuesta, transacción, verificación, decisión de elegibilidad o resultado. El alcance y las condiciones de un acuerdo de usuario completo están por establecerse y revisarse.',
  },
  'terms.s3Title': { en: 'Completion needed', es: 'Pendiente de completar' },
  'terms.s3Text': {
    en: 'Operator identity, account rules, content handling, dispute procedures, governing law and other legal terms have not been drafted here. No additional terms are implied by this summary.',
    es: 'La identidad del operador, las reglas de cuenta, el manejo de contenido, los procedimientos de disputa, la ley aplicable y otros términos legales no se han redactado aquí. No se implican términos adicionales por este resumen.',
  },

  // Privacy Policy
  'privacy.eyebrow': { en: 'Legal · initial draft', es: 'Legal · borrador inicial' },
  'privacy.title': { en: 'Privacy Policy', es: 'Política de Privacidad' },
  'privacy.intro': {
    en: 'This draft intentionally does not make claims about data practices that are not specified in the product brief.',
    es: 'Este borrador intencionalmente no hace afirmaciones sobre prácticas de datos que no están especificadas en el resumen del producto.',
  },
  'privacy.s1Title': { en: 'Information in the product', es: 'Información en el producto' },
  'privacy.s1Text': {
    en: 'The interface collects the mandate and opportunity details participants submit, along with account access managed through Clerk. Request visibility and identity-confidentiality choices appear in the product.',
    es: 'La interfaz recopila los detalles del mandato y la oportunidad que los participantes envían, junto con el acceso a la cuenta gestionado a través de Clerk. Las opciones de visibilidad de solicitudes y confidencialidad de identidad aparecen en el producto.',
  },
  'privacy.s2Title': { en: 'Details still to be confirmed', es: 'Detalles por confirmar' },
  'privacy.s2Text': {
    en: 'The operator must document actual data retention, processors, sharing, deletion, security controls, jurisdictional rights and contact procedures before this draft can serve as a complete privacy policy.',
    es: 'El operador debe documentar la retención real de datos, los procesadores, el intercambio, la eliminación, los controles de seguridad, los derechos jurisdiccionales y los procedimientos de contacto antes de que este borrador pueda servir como política de privacidad completa.',
  },
  'privacy.s3Title': { en: 'No certification claims', es: 'Sin afirmaciones de certificación' },
  'privacy.s3Text': {
    en: 'This draft makes no representation about certifications, security standards, storage locations, encryption practices or compliance status.',
    es: 'Este borrador no hace ninguna representación sobre certificaciones, estándares de seguridad, ubicaciones de almacenamiento, prácticas de cifrado o estado de cumplimiento.',
  },

  // Finder Terms
  'finderTerms.eyebrow': { en: 'Legal · initial draft', es: 'Legal · borrador inicial' },
  'finderTerms.title': { en: 'Finder Terms', es: 'Términos del Buscador' },
  'finderTerms.intro': {
    en: 'A concise draft for people introducing potential business opportunities to a buyer request.',
    es: 'Un borrador conciso para personas que presentan oportunidades de negocio potenciales a una solicitud de comprador.',
  },
  'finderTerms.s1Title': { en: 'Authorized introductions', es: 'Presentaciones autorizadas' },
  'finderTerms.s1Text': {
    en: 'A finder should submit only information they are authorized to share and should describe their relationship to the opportunity. The platform does not determine licensing eligibility or approve a participant to perform regulated activity.',
    es: 'Un buscador debe enviar solo información que esté autorizado a compartir y debe describir su relación con la oportunidad. La plataforma no determina la elegibilidad de licencia ni aprueba a un participante para realizar actividad regulada.',
  },
  'finderTerms.s2Title': { en: 'Potential reward', es: 'Recompensa potencial' },
  'finderTerms.s2Text': {
    en: 'Qualified introductions that result in completed transactions may earn a success-based reward of up to 8% of the final transaction value, subject to applicable terms, transaction structure, licensing requirements, and jurisdiction.',
    es: 'Las presentaciones calificadas que resulten en transacciones completadas pueden generar una recompensa basada en el éxito de hasta el 8% del valor final de la transacción, sujeto a los términos aplicables, la estructura de la transacción, los requisitos de licencia y la jurisdicción.',
  },
  'finderTerms.s3Title': { en: 'Caution', es: 'Precaución' },
  'finderTerms.s3Text': {
    en: 'Reward eligibility, amount, payment timing, and legal requirements vary by transaction, structure, jurisdiction, and participant status. Terms must be confirmed before an introduction or submission. No closing. No finder reward.',
    es: 'La elegibilidad de recompensa, el monto, el momento del pago y los requisitos legales varían según la transacción, la estructura, la jurisdicción y el estado del participante. Los términos deben confirmarse antes de una presentación o envío. Sin cierre. Sin recompensa de buscador.',
  },

  // Buyer Terms
  'buyerTerms.eyebrow': { en: 'Legal · initial draft', es: 'Legal · borrador inicial' },
  'buyerTerms.title': { en: 'Buyer Terms', es: 'Términos del Comprador' },
  'buyerTerms.intro': {
    en: 'A high-level draft for buyers publishing acquisition criteria and reviewing potential introductions.',
    es: 'Un borrador de alto nivel para compradores que publican criterios de adquisición y revisan presentaciones potenciales.',
  },
  'buyerTerms.s1Title': { en: 'Buyer criteria', es: 'Criterios del comprador' },
  'buyerTerms.s1Text': {
    en: 'A buyer provides acquisition criteria and selects the request visibility available in the product. Buyers are responsible for the criteria and other information they submit.',
    es: 'Un comprador proporciona criterios de adquisición y selecciona la visibilidad de solicitud disponible en el producto. Los compradores son responsables de los criterios y otra información que envían.',
  },
  'buyerTerms.s2Title': { en: 'Review and next steps', es: 'Revisión y próximos pasos' },
  'buyerTerms.s2Text': {
    en: 'A submission is a potential match, not a verification, endorsement or promise of follow-up. Buyers decide whether to engage and are responsible for their own diligence and professional advice.',
    es: 'Un envío es una coincidencia potencial, no una verificación, aprobación ni promesa de seguimiento. Los compradores deciden si participar y son responsables de su propia diligencia y asesoramiento profesional.',
  },
  'buyerTerms.s3Title': { en: 'Completion needed', es: 'Pendiente de completar' },
  'buyerTerms.s3Text': {
    en: 'Eligibility, account responsibilities, information use, transaction process and other complete buyer terms remain to be established and reviewed. No additional obligations are implied by this summary.',
    es: 'La elegibilidad, las responsabilidades de la cuenta, el uso de la información, el proceso de transacción y otros términos completos del comprador están por establecerse y revisarse. No se implican obligaciones adicionales por este resumen.',
  },

  // Disclaimer
  'disclaimer.eyebrow': { en: 'Legal · initial draft', es: 'Legal · borrador inicial' },
  'disclaimer.title': { en: 'Disclaimer', es: 'Aviso Legal' },
  'disclaimer.intro': {
    en: 'Important context about the scope of the BuySide platform.',
    es: 'Contexto importante sobre el alcance de la plataforma BuySide.',
  },
  'disclaimer.s1Title': { en: 'Technology and introductions', es: 'Tecnología e introducciones' },
  'disclaimer.s1Text': {
    en: 'BuySide provides a technology and introduction platform. It does not promise transaction outcomes or determine whether an activity is legally permitted for a particular participant.',
    es: 'BuySide proporciona una plataforma de tecnología e introducciones. No promete resultados de transacciones ni determina si una actividad es legalmente permitida para un participante particular.',
  },
  'disclaimer.s2Title': { en: 'Independent review', es: 'Revisión independiente' },
  'disclaimer.s2Text': {
    en: 'Participants should assess their own circumstances, transaction structure and jurisdiction and seek advice from qualified professionals where appropriate.',
    es: 'Los participantes deben evaluar sus propias circunstancias, estructura de transacción y jurisdicción y buscar asesoramiento de profesionales calificados cuando sea apropiado.',
  },

  // Contact
  'contact.eyebrow': { en: 'Platform information', es: 'Información de la plataforma' },
  'contact.title': { en: 'Contact', es: 'Contacto' },
  'contact.intro': {
    en: 'Official contact details are not published on this page.',
    es: 'Los detalles de contacto oficiales no están publicados en esta página.',
  },
  'contact.s1Title': { en: 'Contact route', es: 'Vía de contacto' },
  'contact.s1Text': {
    en: 'A verified contact channel has not been provided for this product. This page does not invent an email address, telephone number or contact form. It will need an official platform contact route before publication.',
    es: 'No se ha proporcionado un canal de contacto verificado para este producto. Esta página no inventa una dirección de correo, número de teléfono o formulario de contacto. Necesitará una vía de contacto oficial antes de su publicación.',
  },
  'contact.s2Title': { en: 'Sensitive information', es: 'Información sensible' },
  'contact.s2Text': {
    en: 'Do not send confidential business, personal, financial or transaction information to an unverified address or channel.',
    es: 'No envíes información confidencial empresarial, personal, financiera o de transacciones a una dirección o canal no verificado.',
  },

  // Hero (updated)
  'home.heroTitleNew': { en: 'Buy and sell Florida businesses without expensive middlemen.', es: 'Compra y vende negocios en Florida sin intermediarios caros.' },
  'home.heroSub': { en: 'Discreet, qualified introductions — connect directly with buyers, sellers, and deal finders.', es: 'Presentaciones discretas y calificadas — conéctate directamente con compradores, vendedores y buscadores de oportunidades.' },
  'home.ctaExplore': { en: 'Explore Opportunities', es: 'Explorar Oportunidades' },
  'home.ctaPostNeed': { en: 'Post What You Need', es: 'Publicar lo que Necesitas' },

  // Featured opportunities
  'home.featuredEyebrow': { en: 'Featured Opportunities', es: 'Oportunidades Destacadas' },
  'home.featuredTitle': { en: "A look at what's on the market.", es: 'Un vistazo a lo que hay en el mercado.' },
  'home.featuredSub': { en: 'Sample opportunities shown for illustration. Join to access live listings.', es: 'Oportunidades de ejemplo mostradas para ilustración. Únete para acceder a listados en vivo.' },
  'home.sampleLabel': { en: 'Sample Opportunity', es: 'Oportunidad de Ejemplo' },
  'home.sampleRequest': { en: 'Sample Request', es: 'Solicitud de Ejemplo' },
  'home.viewAllOpportunities': { en: 'View All Opportunities', es: 'Ver Todas las Oportunidades' },

  // How it works (new 4 steps)
  'home.step1TitleNew': { en: 'Discover', es: 'Descubre' },
  'home.step1DescNew': { en: 'Browse opportunities and requests that match your acquisition goals.', es: 'Explora oportunidades y solicitudes que coincidan con tus objetivos de adquisición.' },
  'home.step2TitleNew': { en: 'Request Introduction', es: 'Solicitar Presentación' },
  'home.step2DescNew': { en: 'Found a match? Request an introduction to the other party.', es: '¿Encontraste una coincidencia? Solicita una presentación a la otra parte.' },
  'home.step3TitleNew': { en: 'Accept Match', es: 'Aceptar Coincidencia' },
  'home.step3DescNew': { en: 'Review the qualified match and accept to proceed.', es: 'Revisa la coincidencia calificada y acepta para continuar.' },
  'home.step4TitleNew': { en: 'Connect Privately', es: 'Conectar Privadamente' },
  'home.step4DescNew': { en: 'Connect directly and move the conversation forward on your terms.', es: 'Conéctate directamente y avanza la conversación a tu manera.' },
  'home.introFeeNote': { en: 'The $99 introduction fee is charged only when a buyer accepts a qualified match.', es: 'La tarifa de presentación de $99 se cobra solo cuando un comprador acepta una coincidencia calificada.' },

  // Trust
  'home.trustEyebrow': { en: 'Trust & Confidentiality', es: 'Confianza y Confidencialidad' },
  'home.trustTitle': { en: 'Verified members. Controlled disclosure. Private by design.', es: 'Miembros verificados. Divulgación controlada. Privado por diseño.' },
  'home.trustVerified': { en: 'Verified Member', es: 'Miembro Verificado' },
  'home.trustVerifiedDesc': { en: 'Badges distinguish members whose identity and credentials have been confirmed.', es: 'Las insignias distinguen a los miembros cuya identidad y credenciales han sido confirmadas.' },
  'home.trustPrivateInfo': { en: 'Private Information', es: 'Información Privada' },
  'home.trustPrivateDesc': { en: 'Business details stay confidential until both parties agree to share more.', es: 'Los detalles del negocio permanecen confidenciales hasta que ambas partes acuerden compartir más.' },
  'home.trustQualified': { en: 'Qualified Introductions', es: 'Presentaciones Calificadas' },
  'home.trustQualifiedDesc': { en: 'Every introduction is reviewed before it reaches you. No spam, no noise.', es: 'Cada presentación es revisada antes de llegar a ti. Sin spam, sin ruido.' },
  'home.trustControlled': { en: 'Controlled Disclosure', es: 'Divulgación Controlada' },
  'home.trustControlledDesc': { en: 'You decide what to share, when, and with whom — at every step.', es: 'Tú decides qué compartir, cuándo y con quién — en cada paso.' },

  // Membership preview
  'home.membershipEyebrow': { en: 'Membership', es: 'Membresía' },
  'home.membershipTitle': { en: 'Choose your level of access.', es: 'Elige tu nivel de acceso.' },
  'home.membershipBody': { en: 'Transparent monthly pricing. No transaction percentages. The $99 introduction fee applies only when you accept a qualified match.', es: 'Precios mensuales transparentes. Sin porcentajes de transacción. La tarifa de presentación de $99 aplica solo cuando aceptas una coincidencia calificada.' },
  'home.membershipCta': { en: 'View Plans', es: 'Ver Planes' },
  'home.planFree': { en: 'Free', es: 'Gratis' },
  'home.planBuyerPro': { en: 'Buyer Pro', es: 'Buyer Pro' },
  'home.planProfessional': { en: 'Professional', es: 'Professional' },
  'home.planPrivateNetwork': { en: 'Private Network', es: 'Private Network' },

  // Social proof (hidden until data available)
  'home.socialEyebrow': { en: 'By the Numbers', es: 'En Cifras' },
  'home.socialTitle': { en: 'A growing network of serious participants.', es: 'Una red creciente de participantes serios.' },
  'home.socialBusinesses': { en: 'Businesses Listed', es: 'Negocios Listados' },
  'home.socialIntroductions': { en: 'Introductions Made', es: 'Presentaciones Realizadas' },
  'home.socialVerified': { en: 'Verified Members', es: 'Miembros Verificados' },
  'home.socialTestimonials': { en: 'Member Testimonials', es: 'Testimonios de Miembros' },

  // Final CTA
  'home.finalCtaTitle': { en: 'Ready to find your next opportunity?', es: '¿Listo para encontrar tu próxima oportunidad?' },
  'home.finalCtaBody': { en: 'Join BuySide to browse opportunities, post requests, and connect privately.', es: 'Únete a BuySide para explorar oportunidades, publicar solicitudes y conectar de forma privada.' },

  // Request form steps
  'postRequest.step1': { en: 'What do you need?', es: '¿Qué necesitas?' },
  'postRequest.step2': { en: 'Details', es: 'Detalles' },
  'postRequest.step3': { en: 'Contact', es: 'Contacto' },
  'postRequest.stepLabel': { en: 'Step', es: 'Paso' },
  'postRequest.of': { en: 'of', es: 'de' },
  'postRequest.next': { en: 'Continue', es: 'Continuar' },
  'postRequest.back': { en: 'Back', es: 'Atrás' },
} as const;

export type TranslationKey = keyof typeof translations;

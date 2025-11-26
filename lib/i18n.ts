import { Language } from '../types';

type TranslationKeys = {
  nav: {
    dashboard: string;
    editor: string;
    logout: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    createNew: string;
    yourCards: string;
    noCards: string;
    startBuilding: string;
    createFirst: string;
    performance: string;
    draft: string;
    published: string;
    actions: {
      preview: string;
      edit: string;
      delete: string;
      deleteConfirm: string;
    };
  };
  editor: {
    back: string;
    saved: string;
    saving: string;
    publish: string;
    publishing: string;
    tabs: {
      profile: string;
      design: string;
      links: string;
    };
    profile: {
      photo: string;
      photoDesc: string;
      upload: string;
      firstName: string;
      lastName: string;
      jobTitle: string;
      company: string;
      bio: string;
      aiButton: string;
      aiThinking: string;
      contactGroup: string;
      email: string;
      phone: string;
      location: string;
    };
    design: {
      themes: string;
      brand: string;
      brandDesc: string;
      atmosphere: string;
      layout: string;
    };
    links: {
      title: string;
      add: string;
      empty: string;
      emptyDesc: string;
      platform: string;
      label: string;
      url: string;
    };
  };
  preview: {
    saveContact: string;
    about: string;
    connect: string;
    poweredBy: string;
  };
  share: {
    title: string;
    subtitle: string;
    scan: string;
    publicLink: string;
    saveQr: string;
    openPublic: string;
    copied: string;
  };
  analytics: {
    totalViews: string;
    totalInteractions: string;
    conversionRate: string;
    performanceOverview: string;
    days: Record<string, string>; // Maps 'Mon' -> 'Lun' etc.
  };
};

export const translations: Record<Language, TranslationKeys> = {
  es: {
    nav: {
      dashboard: "Mis Tarjetas",
      editor: "Editor",
      logout: "Salir"
    },
    dashboard: {
      title: "Panel de Control",
      subtitle: "Gestiona tus identidades digitales. Crea, edita y monitorea el rendimiento de tus tarjetas en un solo lugar.",
      createNew: "Crear Nueva Tarjeta",
      yourCards: "Tus Tarjetas",
      noCards: "No se encontraron tarjetas",
      startBuilding: "Comienza a construir tu presencia digital hoy.",
      createFirst: "Crea tu primera tarjeta",
      performance: "Rendimiento Global",
      draft: "Borrador",
      published: "Pública",
      actions: {
        preview: "Vista Previa",
        edit: "Editar",
        delete: "Borrar",
        deleteConfirm: "¿Estás seguro de que quieres eliminar esta tarjeta?"
      }
    },
    editor: {
      back: "Panel",
      saved: "Guardado",
      saving: "Guardando...",
      publish: "Publicar Tarjeta",
      publishing: "Publicando...",
      tabs: {
        profile: "Perfil",
        design: "Diseño",
        links: "Enlaces"
      },
      profile: {
        photo: "Foto de Perfil",
        photoDesc: "Una buena foto genera confianza.",
        upload: "Subir Imagen",
        firstName: "Nombre",
        lastName: "Apellido",
        jobTitle: "Cargo / Título",
        company: "Empresa",
        bio: "Biografía Profesional",
        aiButton: "Mejorar con IA",
        aiThinking: "Pensando...",
        contactGroup: "Información de Contacto",
        email: "Email",
        phone: "Teléfono",
        location: "Ubicación"
      },
      design: {
        themes: "Temas Profesionales",
        brand: "Identidad de Marca",
        brandDesc: "Color Principal",
        atmosphere: "Atmósfera",
        layout: "Estructura"
      },
      links: {
        title: "Tu Ecosistema Digital",
        add: "Agregar Enlace",
        empty: "No hay enlaces agregados aún.",
        emptyDesc: "Agrega tus redes sociales para conectar.",
        platform: "Plataforma",
        label: "Etiqueta",
        url: "URL"
      }
    },
    preview: {
      saveContact: "Guardar Contacto",
      about: "Sobre Mí",
      connect: "Conectar",
      poweredBy: "Creado con INDI"
    },
    share: {
      title: "¡Tarjeta Publicada!",
      subtitle: "Tu identidad digital ya está en línea.",
      scan: "Escanea para guardar contacto",
      publicLink: "Enlace Público",
      saveQr: "Guardar QR",
      openPublic: "Ver Página Pública",
      copied: "¡Copiado!"
    },
    analytics: {
      totalViews: "Vistas Totales",
      totalInteractions: "Interacciones",
      conversionRate: "Tasa de Conversión",
      performanceOverview: "Resumen de Rendimiento",
      days: {
        'Mon': 'Lun',
        'Tue': 'Mar',
        'Wed': 'Mié',
        'Thu': 'Jue',
        'Fri': 'Vie',
        'Sat': 'Sáb',
        'Sun': 'Dom'
      }
    }
  },
  en: {
    nav: {
      dashboard: "My Cards",
      editor: "Editor",
      logout: "Logout"
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Manage your digital identities. Create, edit, and track the performance of your cards in one place.",
      createNew: "Create New Card",
      yourCards: "Your Cards",
      noCards: "No cards found",
      startBuilding: "Start building your digital presence today.",
      createFirst: "Create your first card",
      performance: "Global Performance",
      draft: "Draft",
      published: "Published",
      actions: {
        preview: "Preview",
        edit: "Edit",
        delete: "Delete",
        deleteConfirm: "Are you sure you want to delete this card?"
      }
    },
    editor: {
      back: "Dashboard",
      saved: "Saved",
      saving: "Saving...",
      publish: "Publish Card",
      publishing: "Publishing...",
      tabs: {
        profile: "Profile",
        design: "Design",
        links: "Links"
      },
      profile: {
        photo: "Profile Photo",
        photoDesc: "Professional headshots build trust.",
        upload: "Upload Image",
        firstName: "First Name",
        lastName: "Last Name",
        jobTitle: "Job Title",
        company: "Company",
        bio: "Professional Bio",
        aiButton: "AI Enhance",
        aiThinking: "Thinking...",
        contactGroup: "Contact Info",
        email: "Email",
        phone: "Phone",
        location: "Location"
      },
      design: {
        themes: "Professional Themes",
        brand: "Brand Identity",
        brandDesc: "Primary Brand Color",
        atmosphere: "Atmosphere",
        layout: "Layout Structure"
      },
      links: {
        title: "Your Digital Ecosystem",
        add: "Add Link",
        empty: "No links added yet.",
        emptyDesc: "Add your social media to connect.",
        platform: "Platform",
        label: "Label",
        url: "URL"
      }
    },
    preview: {
      saveContact: "Save Contact",
      about: "About",
      connect: "Connect",
      poweredBy: "Powered by INDI"
    },
    share: {
      title: "Card Published!",
      subtitle: "Your digital identity is now online.",
      scan: "Scan to save contact instantly",
      publicLink: "Public Link",
      saveQr: "Save QR",
      openPublic: "Open Public Page",
      copied: "Copied!"
    },
    analytics: {
      totalViews: "Total Views",
      totalInteractions: "Total Interactions",
      conversionRate: "Conversion Rate",
      performanceOverview: "Performance Overview",
      days: {
        'Mon': 'Mon',
        'Tue': 'Tue',
        'Wed': 'Wed',
        'Thu': 'Thu',
        'Fri': 'Fri',
        'Sat': 'Sat',
        'Sun': 'Sun'
      }
    }
  }
};
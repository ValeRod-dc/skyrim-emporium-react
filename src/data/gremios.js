export const configuracionGremios  = {
    "adrianne-herreria": { categoria: "herreria", titulo: "Herrería de Adrianne Avenicci", tipo: "Herrería", icono: "Whiterun.png", region: "Whiterun", subtitulo: "Whiterun · Especialista en herrería, buenos precios en metal." },
    "arcadias-cauldron": { categoria: "alquimia", titulo: "Arcadia's Cauldron", tipo: "Alquimia", icono: "Whiterun.png", region: "Whiterun", subtitulo: "Inventario de Alquimia · Pociones, venenos e ingredientes" },
    "belethor": { categoria: "bienesGenerales", titulo: "Belethor - Bienes Generales", tipo: "Bienes generales", icono: "Whiterun.png", region: "Whiterun", subtitulo: "Whiterun · Todo lo que puedas necesitar, y algo más." },
    "comerciantes-solitude": { categoria: "ropaFina", titulo: "Gremio de Comerciantes de Solitude", tipo: "Ropa fina", icono: "Solitude.png", region: "Solitude", subtitulo: "Solitude · Ropa, calzado, joyas y accesorios de la más alta calidad imperial." },
    "corcel-encabritado": { categoria: "comida", titulo: "El Corcel Encabritado", tipo: "Comida y taberna", icono: "Whiterun.png", region: "Whiterun", subtitulo: "Whiterun · La mejor taberna para reponer provisiones." },
    "colegio-winterhold": { categoria: "magia", titulo: "Colegio de Winterhold", tipo: "Magia", icono: "Winterhold.png", region: "Winterhold", subtitulo: "Winterhold · El centro del conocimiento arcano en Skyrim." }
};

export const gremios = Object.entries(configuracionGremios).map(([slug, datos]) => ({
    slug: slug,
    nombre: datos.titulo,
    ...datos
}));
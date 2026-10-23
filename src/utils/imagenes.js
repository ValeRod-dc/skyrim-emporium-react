export function imagenCatalogo(ruta) {
    if (!ruta) return "";
    if (/^(data:|https?:|blob:)/i.test(ruta)) return ruta;
    return `/${ruta}`
    .replace("assets/img/Alquimia/Ingredients/", "assets/img/Alquimia/Ingredientes/")
    .replace("assets/img/Herreria/Armas/Arquería/", "assets/img/Herreria/Armas/Arqueria/")
    .replace("assets/img/Herreria/Armas/Flechas/", "assets/img/Herreria/Armas/Arqueria/Flechas/")
    .replace("assets/img/Herreria/Armadura/Pesada/Armadura_hombresra_hueso.png", "assets/img/Herreria/Armadura/Pesada/Armadura_hombreras_hueso.png")
    .replace("assets/img/Herreria/Armadura/Pesada/Yelmo_acero_cuerros.png", "assets/img/Herreria/Armadura/Pesada/Yelmo_acero_cuernos.png")
    .replace("assets/img/Herreria/Armadura/Pesada/Yelmo_nordicos_tallados.png", "assets/img/Herreria/Armadura/Pesada/Yelmo_nordico_tallado.png")
    .replace("assets/img/Herreria/Armadura/Pesada/Yelmo_pesado_quininoso.png", "assets/img/Herreria/Armadura/Pesada/Yelmo_pesado_quitinoso.png")
    .replace("assets/img/Alquimia/Ingredientes/Cola_espada_cyrodiplica.png", "assets/img/Alquimia/Ingredientes/Cola_espada_cyrodilica.png")
    .replace("assets/img/Alquimia/Ingredientes/Garra_oso.png", "assets/img/Alquimia/Ingredientes/Garras_oso.png")
    .replace("assets/img/Taberna/Comida/Vino_altopng", "assets/img/Taberna/Comida/Vino_alto.png")
    .replace("assets/img/Taberna/Comida/Manquilla.png", "assets/img/Taberna/Comida/Mantequilla.png")
    .replace("assets/img/Magia/Bastones/Baston_conjuración.png", "assets/img/Magia/Bastones/Baston_conjuracion.png")
    .replace("assets/img/Magia/Bastones/Baston_restauración.png", "assets/img/Magia/Bastones/Baston_restauracion.png")
    .replace("assets/img/Taberna/Comida/Bowl_1.png", "assets/img/Bienes_generales/Bowl_1.png")
    .replace("assets/img/Taberna/Comida/Caliz.png", "assets/img/Bienes_generales/Caliz.png")
    .replace("assets/img/Taberna/Comida/Caliz_1.png", "assets/img/Bienes_generales/Caliz_1.png")
    .replace("assets/img/Taberna/Comida/Caliz2.png", "assets/img/Bienes_generales/Caliz_2.png")
    .replace("assets/img/Taberna/Comida/Cuenco_madera.png", "assets/img/Bienes_generales/Cuenco_madera.png")
    .replace("assets/img/Taberna/Comida/Pichel.png", "assets/img/Bienes_generales/Pichel.png")
    .replace("assets/img/Taberna/Comida/Plato.png", "assets/img/Bienes_generales/Plato.png")
    .replace("assets/img/Taberna/Comida/Plato2.png", "assets/img/Bienes_generales/Plato_2.png")
    .replace("assets/img/Taberna/Comida/Plato_madera.png", "assets/img/Bienes_generales/Plato_madera.png")
    .replace("assets/img/Taberna/Comida/Taza.png", "assets/img/Bienes_generales/Taza.png")
    .replace("assets/img/Taberna/Comida/Tenedor.png", "assets/img/Bienes_generales/Tenedor.png");
}

export function esProductoLegendario(producto, config) {
    if (config.categoria !== "herreria") return false;
    const nombre = String(producto.name || producto.nombre || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return /daedric|stalhrim|nordic/.test(nombre);
}
export const regionesChile = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
    "Atacama": ["Copiapó", "Caldera", "Vallenar"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Metropolitana de Santiago": ["Santiago", "Maipú", "Puente Alto"],
    "O'Higgins": ["Rancagua", "San Fernando", "Rengo"],
    "Maule": ["Talca", "Curicó", "Linares"],
    "Ñuble": ["Chillán", "San Carlos", "Bulnes"],
    "Biobío": ["Concepción", "Los Ángeles", "Talcahuano"],
    "La Araucanía": ["Temuco", "Angol", "Villarrica"],
    "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
    "Aysén": ["Coyhaique", "Aysén", "Chile Chico"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

export const usuarios = [
    {
        run: "0000000K",
        nombre: "NOMBRE",
        apellidos: "APELLIDOS",
        correo: "ejemplo@gmail.com",
        contrasena: "123456",
        tipo: "Cliente"
    },

    {
        run: "12345678-9",
        nombre: "Valeria",
        apellidos: "Rodriguez",
        correo: "vale.rodrigueza@duoc.cl",
        contrasena: "1234567",
        tipo: "Administrador"
    },
    {
        run: "11111111-1",
        nombre: "Vendedor",
        apellidos: "Skyrim",
        correo: "vendedor@duoc.cl",
        contrasena: "123456",
        tipo: "Vendedor"
    }
];

const CLAVE_USUARIOS = "skyrimUsuarios";
const CLAVE_USUARIOS_ELIMINADOS = "skyrimUsuariosEliminados";
const normalizarRun = (run) => String(run).replace(/[.-]/g, "").toUpperCase();

try {
    const usuariosGuardados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS) || "[]");
    if (Array.isArray(usuariosGuardados)) {
        usuariosGuardados.forEach(usuarioGuardado => {
            const indice = usuarios.findIndex(usuario => usuario.run === usuarioGuardado.run);
            if (indice >= 0) usuarios[indice] = { ...usuarios[indice], ...usuarioGuardado };
            else usuarios.push(usuarioGuardado);
        });
    }
    const usuariosEliminados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS_ELIMINADOS) || "[]");
    if (Array.isArray(usuariosEliminados)) {
        for (let index = usuarios.length - 1; index >= 0; index -= 1) {
            if (usuariosEliminados.includes(usuarios[index].run.toUpperCase())) usuarios.splice(index, 1);
        }
    }
} catch (error) {
    console.error("No se pudieron cargar los usuarios guardados.", error);
    localStorage.removeItem(CLAVE_USUARIOS);
}

export function guardarUsuario(usuario) {
    if (usuarios.some(item =>
        normalizarRun(item.run) === normalizarRun(usuario.run) ||
        item.correo.toLowerCase() === usuario.correo.toLowerCase()
    )) {
        return false;
    }

    try {
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify([...usuarios, usuario]));
        const eliminados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS_ELIMINADOS) || "[]")
            .filter((run) => run !== usuario.run.toUpperCase());
        localStorage.setItem(CLAVE_USUARIOS_ELIMINADOS, JSON.stringify(eliminados));
    } catch (error) {
        console.error("No se pudo guardar el nuevo usuario.", error);
        return false;
    }
    usuarios.push(usuario);
    return true;
}

export function actualizarUsuario(usuarioActualizado) {
    const indice = usuarios.findIndex(usuario => usuario.run.toUpperCase() === usuarioActualizado.run.toUpperCase());
    if (indice < 0) return false;

    const duplicado = usuarios.some((usuario, index) =>
        index !== indice &&
        (usuario.correo.toLowerCase() === usuarioActualizado.correo.toLowerCase() ||
            usuario.run.toUpperCase() === usuarioActualizado.run.toUpperCase())
    );
    if (duplicado) return false;

    const usuariosActualizados = usuarios.map((usuario, index) =>
        index === indice ? { ...usuario, ...usuarioActualizado } : usuario
    );
    try {
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosActualizados));
    } catch (error) {
        console.error("No se pudieron guardar los cambios del usuario.", error);
        return false;
    }
    usuarios[indice] = usuariosActualizados[indice];
    return true;
}

export function eliminarUsuario(run) {
    const indice = usuarios.findIndex(usuario => usuario.run.toUpperCase() === run.toUpperCase());
    if (indice < 0) return false;

    const usuario = usuarios[indice];
    if (usuario.tipo === "Administrador" && usuarios.filter(item => item.tipo === "Administrador").length <= 1) {
        return false;
    }

    const usuariosActualizados = usuarios.filter((_, index) => index !== indice);
    try {
        const eliminados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS_ELIMINADOS) || "[]");
        if (!eliminados.includes(usuario.run.toUpperCase())) eliminados.push(usuario.run.toUpperCase());
        localStorage.setItem(CLAVE_USUARIOS_ELIMINADOS, JSON.stringify(eliminados));
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosActualizados));
    } catch (error) {
        console.error("No se pudo eliminar el usuario.", error);
        return false;
    }
    usuarios.splice(indice, 1);
    return true;
}

import { useState } from "react";

const ContactoForm = ({ agregarContacto, setMensaje }) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    const validaciones = (e) => {
        e.preventDefault();
        if (nombre.trim() === "") {
            setMensaje("El nombre no debe estar vacío.");
            return;
        }
        const nombreRegex = /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/;
        if(!nombreRegex.test(nombre)) {
            setMensaje("El nombre debe tener un formato válido.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMensaje("El correo electrónico debe tener un formato válido.");
            return;
        }
        const telefonoRegex = /^\d{9}$/;
        if (!telefonoRegex.test(telefono)) {
            setMensaje("El número de teléfono debe tener un formato válido de 9 dígitos.");
            return;
        }

        const telefonoConPrefijo = `+56${telefono}`;
        agregarContacto(nombre, email, telefonoConPrefijo);
        setNombre("");
        setEmail("");
        setTelefono("");
        setMensaje("Contacto agregado exitosamente.");
    };

    return (
        <form onSubmit={validaciones}>
            <div className="row mb-3">
                <div className="col-md-12">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre y Apellido"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@dominio.com"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Número de Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="987654321"
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Agregar Contacto
            </button>
        </form>
    );
    
};

export default ContactoForm;
import { Fragment, useState, useEffect } from "react";


const ContactoItem = ({ contacto, cambiarEstado, editarContacto, eliminarContacto }) => {
    const { id, nombre, email, telefono, estado } = contacto;
    const [modoEdicion, setModoEdicion] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState(nombre);
    const [nuevoEmail, setNuevoEmail] = useState(email);
    const [nuevoTelefono, setNuevoTelefono] = useState(telefono);
    const [errores, setErrores] = useState({});

    useEffect(() => {
        setNuevoNombre(nombre);
        setNuevoEmail(email);
        setNuevoTelefono(telefono);
    }, [nombre, email, telefono]);

    const fnCambiarEstado = () => {
        cambiarEstado(id);
    };

    const fnEditar = () => {
        setModoEdicion(true);
        setErrores({});
    };

    const fnGuardar = () => {
        const nuevosErrores = {};

        if (nuevoNombre.trim() === "") {
            nuevosErrores.nombre = "El nombre no debe estar vacío";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(nuevoEmail)) {
            nuevosErrores.email = "El correo electrónico debe tener un formato válido";
        }

        const telefonoRegex = /^\+56\d{9}$/;
        if (!telefonoRegex.test(nuevoTelefono)) {
            nuevosErrores.telefono = "El número de teléfono debe tener un formato válido y debe incluir +56 seguido de 9 dígitos";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        editarContacto(id, nuevoNombre, nuevoEmail, nuevoTelefono);
        setModoEdicion(false);
    };

    const fnCancelar = () => {
        setNuevoNombre(nombre);
        setNuevoEmail(email);
        setNuevoTelefono(telefono);
        setModoEdicion(false);
    };

    const fnInputChange = (setter) => (e) => {
        const { value } = e.target;
        setter(value);

        if (value.trim() !== "") {
            setErrores((prevErrores) => {
                const { nombre, ...rest } = prevErrores;
                return { ...rest };
            });
        }
        if (emailRegex.test(value)) {
            setErrores((prevErrores) => {
                const { email, ...rest } = prevErrores;
                return { ...rest };
            });
        }
        if (telefonoRegex.test(value)) {
            setErrores((prevErrores) => {
                const { telefono, ...rest } = prevErrores;
                return { ...rest };
            });
        }
    };

    const fnEliminar = () => {
        eliminarContacto(id);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\+56\d{9}$/;

    return (
        <div className="col-sm-6 col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
                <div className="card-body">
                    {modoEdicion ? (
                        <Fragment>
                            <input type="text" className={`form-control mb-2 ${errores.nombre ? "is-invalid" : ""}`} value={nuevoNombre} onChange={fnInputChange(setNuevoNombre)} placeholder="Nombre" />
                            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                            <input type="email" className={`form-control mb-2 ${errores.email ? "is-invalid" : ""}`} value={nuevoEmail} onChange={fnInputChange(setNuevoEmail)} placeholder="Email" />
                            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                            <input type="text" className={`form-control mb-2 ${errores.telefono ? "is-invalid" : ""}`} value={nuevoTelefono} onChange={fnInputChange(setNuevoTelefono)} placeholder="Teléfono" />
                            {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h5 className="card-title">{nombre}</h5>
                            <p className="card-text">
                                <strong>Email:</strong> {email}<br />
                                <strong>Teléfono:</strong> {telefono}
                            </p>
                        </Fragment>
                    )}
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    {modoEdicion ? (
                        <Fragment>
                            <div className="button-group">
                                <button className="btn btn-success me-2" onClick={fnGuardar}>Guardar</button>
                                <button className="btn btn-secondary" onClick={fnCancelar}>Cancelar</button>
                            </div>
                        </Fragment>
                    ) : (
                        <div className="button-group">
                            <button className="btn btn-primary me-2" onClick={fnEditar}>Editar</button>
                            <button className="btn btn-danger" onClick={fnEliminar}>Eliminar</button>
                        </div>
                    )}
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input me-2" onChange={fnCambiarEstado} checked={estado}/>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
};

export default ContactoItem;
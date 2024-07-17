import { Fragment, useState, useRef, useEffect } from "react";
import ContactoItem from "./ContactoItem";
import ContactoForm from "./ContactoForm";
import ConfModal from "./ConfModal";
import uuid4 from "uuid4";

const ContactoList = () => {
    const [contactos, setContactos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const contactosPorPagina = 5;
    const [ordenUp, setOrdenUp] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [deleteId, setDeleteId] = useState(null);
    const [deleteType, setDeleteType] = useState("");

    const agregarContacto = (nombre, email, telefono) => {
        const nuevoContacto = {
            id: uuid4(),
            nombre,
            email,
            telefono,
            estado: false
        };
        setContactos((prevContactos) => [...prevContactos, nuevoContacto]);
        setMensaje("Contacto agregado exitosamente.");
    };

    const editarContacto = (id, nombre, email, telefono) => {
        const newContactos = contactos.map(contacto => 
            contacto.id === id ? { ...contacto, nombre, email, telefono } : contacto
        );
        setContactos(newContactos);
        setMensaje("Contacto editado exitosamente.");
    };

    const eliminarContacto = (id) => {
        setShowModal(true);
        setDeleteType("individual");
        setDeleteId(id);
        setModalContent({
            title: "Confirmar eliminación",
            body: "¿Está seguro de que desea eliminar este contacto?",
            confirmAction: () => confirmarEliminarContacto()
        });
    };

    const confirmarEliminarContacto = () => {
        const newContactos = contactos.filter(contacto => contacto.id !== deleteId);
        setContactos(newContactos);
        setMensaje("Contacto eliminado exitosamente.");
        setShowModal(false);
    };

    const cambiarEstadoRegistro = (id) => {
        const newContactos = [...contactos];
        const contacto = newContactos.find((contacto) => contacto.id === id);
        contacto.estado = !contacto.estado;
        setContactos(newContactos);
    };

    const eliminarContactosGlobal = () => {
        setShowModal(true);
        setDeleteType("global");
        setModalContent({
            title: "Confirmar eliminación de selección",
            body: "¿Está seguro de que desea eliminar todos los contactos seleccionados?",
            confirmAction: () => confirmarEliminarContactosGlobal()
        });
    };

    const confirmarEliminarContactosGlobal = () => {
        const newContactos = contactos.filter((contacto) => !contacto.estado);
        setContactos(newContactos);
        setShowModal(false);
    };

    const KEY = 'contactos';
    useEffect(() => {
        const storedContactos = JSON.parse(localStorage.getItem(KEY));
        if (storedContactos) setContactos(storedContactos);
    }, []);
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(contactos));
    }, [contactos]);

    const busquedaEnVivo = (e) => {
        setBusqueda(e.target.value);
    };
    
    const ordenarPorNombre = () => {
        const contactosOrdenados = [...contactos].sort((a, b) => {
            if (ordenUp) {
                return a.nombre.localeCompare(b.nombre);
            } else {
                return b.nombre.localeCompare(a.nombre);
            }
        });
        setContactos(contactosOrdenados);
        setOrdenUp(!ordenUp);
    };

    const contactosFiltrados = contactos.filter((contacto) => contacto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || contacto.email.toLowerCase().includes(busqueda.toLowerCase()) || contacto.telefono.includes(busqueda));
    const indiceUltimoContacto = paginaActual * contactosPorPagina;
    const indicePrimerContacto = indiceUltimoContacto - contactosPorPagina;
    const contactosPaginados = contactosFiltrados.slice(indicePrimerContacto, indiceUltimoContacto);

    const paginas = [];
    for (let i = 1; i <= Math.ceil(contactosFiltrados.length / contactosPorPagina); i++) {
        paginas.push(i);
    }

    return (
        <Fragment>
            <div className="container bg-light mt-5">
                <h1 className="display-5 text-center">Directorio de contactos</h1>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        {mensaje && <div className="alert alert-info">{mensaje}</div>}
                        <ContactoForm agregarContacto={agregarContacto} setMensaje={setMensaje} />
                        <div className="input-group my-3">
                            <button className="btn btn-danger" onClick={eliminarContactosGlobal}>
                                <i className="bi bi-trash3"></i> Eliminar selección
                            </button>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Buscar contactos" value={busqueda} onChange={busquedaEnVivo}/>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-secondary" onClick={ordenarPorNombre}>Orden {ordenUp ? 'Descendente' : 'Ascendente'}</button>
                        </div>
                        <ul className="list-group">
                            {contactosPaginados.map((contacto) => (
                                <ContactoItem key={contacto.id} contacto={contacto} cambiarEstado={cambiarEstadoRegistro} editarContacto={editarContacto} eliminarContacto={eliminarContacto} />
                            ))}
                        </ul>
                        <nav className="mt-3">
                            <ul className="pagination justify-content-center">
                                {paginas.map(numero => (
                                    <li key={numero} className="page-item">
                                        <button onClick={() => setPaginaActual(numero)} className="page-link">
                                            {numero}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <ConfModal show={showModal} onHide={() => setShowModal(false)} content={modalContent} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ContactoList;
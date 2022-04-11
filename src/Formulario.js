import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Formulario = () => {
	const [formularioEnviado, setFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					nombre: '',
					correo: ''
				}}
				validate={(valores) => {
					let errores = {};

					// Validación nombre
					if (!valores.nombre) {
						errores.nombre = 'Por favor ingresa un nombre';
					} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
						errores.nombre = 'El nombre solo debe contener solo letras y espacios';
					}

					// Validación correo
					if (!valores.correo) {
						errores.correo = 'Por favor ingresa un correo electronico';
					} else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)) {
						errores.correo = 'El correo solo debe contener letras, numeros, puntos, guiones y guiones bajos';
					}

					return errores;
				}}
				onSubmit={(valores, {resetForm}) => {
					resetForm();
					console.log('Formulario Enviado');
					setFormularioEnviado(true);
					setTimeout(() => setFormularioEnviado(false), 5000);
				}}
			>
				{/* { values, errors, touched, handleSubmit, handleChange, handleBlur } */}
				{({errors}) => (
					<Form className='formulario'>
						<div>
							<label htmlFor='nombre'>Nombre</label>
							<Field
								type='text'
								id='nombre'
								name='nombre'
								placeholder='John Doe'
							/>
							<ErrorMessage name='nombre' component={() => {<div className='error'>{errors.nombre}</div>}} />
						</div>
						<div>
							<label htmlFor='correo'>Correo</label>
							<Field
								type='text'
								id='correo'
								name='correo'
								placeholder='correo@correo.com'
							/>
							<ErrorMessage name='correo' component={() => {<div className='error'>{errors.correo}</div>}} />
						</div>
						<button type='submit'>Enviar</button>
						{formularioEnviado && <p className='exito'>Formulario enviado con exito!</p>}
					</Form>
				)}
			</Formik>
		</>
	);
}

export default Formulario;
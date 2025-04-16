-- En este archivo deben estar tus ejercicios de consultas sql


--Empleados ordenados alfabéticamente (Z...A):
--Muestra los nombres de los empleados en orden alfabético descendente.

SELECT nombres
FROM empleados 
ORDER BY nombres DESC;


--Empleados de Soporte:
--Muestra el nombre, el puesto y la localidad de los 
--empleados con el puesto de 'Soporte'.

SELECT e.nombres, p.puesto, l.localidad
FROM empleados e 
JOIN puestos p ON e.puesto_id = p.id
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE p.puesto = 'Soporte';

--Nombres que terminan con 'o':
--Lista los nombres de los empleados 
--cuyo nombre termina con la letra 'o'.

SELECT nombres
FROM empleados
WHERE nombres LIKE '%o';

--Empleados en Carlos Paz:
--Muestra el nombre, sueldo y localidad de los empleados 
--que trabajan en la localidad Carlos Paz.

SELECT e.nombres, e.sueldo, l.localidad
FROM empleados e 
JOIN departamentos d ON e.departamento_id = d.id 
JOIN localidades l ON l.id = d.localidad_id
WHERE l.localidad = 'Carlos Paz';

--Sueldos entre 10000 y 13000:
--Muestra el nombre, sueldo y localidad de los empleados 
--cuyo sueldo se encuentra entre 10000 y 13000.

SELECT e.nombres, e.sueldo, l.localidad 
FROM empleados e 
JOIN departamentos d ON e.departamento_id = d.id 
JOIN localidades l ON l.id = d.localidad_id
WHERE e.sueldo BETWEEN 10000 and 13000;

--Departamentos con más de 5 empleados:
--Visualiza los departamentos que tienen más de 5 empleados.

SELECT d.denominacion, COUNT(*) AS total_empleados
FROM empleados e 
JOIN departamentos d ON e.departamento_id = d.id 
GROUP BY d.denominacion
HAVING total_empleados > 5;


--Empleados en Córdoba con puesto de Analista o Programador:
--Muestra los nombres de los empleados que trabajan en Córdoba 
--y tienen el puesto de 'Analista' o 'Programador'.

SELECT e.nombres
FROM empleados e 
JOIN departamentos d ON e.departamento_id = d.id 
JOIN puestos p ON e.puesto_id = p.id
JOIN localidades l ON d.localidad_id = l.id
WHERE p.puesto IN ('Analista', 'Programador') AND l.localidad = 'Córdoba';


--Sueldo medio de todos los empleados:
--Calcula el sueldo medio de todos los empleados.

SELECT AVG(sueldo) AS sueldo_medio
FROM empleados;



--Máximo sueldo en el departamento 10:
--Muestra el máximo sueldo de los empleados del departamento 10.

SELECT MAX(sueldo) AS Sueldo_Máximo
FROM empleados e 
JOIN departamentos d ON e.departamento_id = d.id
WHERE d.id = 10;


--Sueldo mínimo en el departamento Soporte:
--Calcula el sueldo mínimo de los empleados del departamento 'Soporte'.

SELECT MIN(sueldo) AS Sueldo_Mínimo
FROM empleados e 
JOIN departamentos d ON e.departamento_id = d.id
WHERE d.denominacion = 'Soporte';

--Suma de sueldos por puesto:
--Calcula la suma de sueldos para cada puesto.

SELECT p.puesto, SUM(sueldo) AS Sueldos_por_Puesto
FROM empleados e 
JOIN puestos p ON e.puesto_id = p.id
GROUP BY p.puesto;




// --- CONFIGURACIÓN DE SUPABASE ---
// Estas son tus credenciales reales obtenidas de Supabase
const SUPABASE_URL = 'https://hjicwidfumjzpwndonff.supabase.co'; // Tu Project URL real
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqaWN3aWRmdW1qenB3bmRvbmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzY1NjcsImV4cCI6MjA5MDY1MjU2N30.H1yZ4geDkNtFfBkHK1W9WhSKqLY4WAE4DYPfNquQumg'; // Tu real

// Inicializa el cliente de Supabase con tus credenciales
const { createClient } = supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Cliente de Supabase inicializado.");

// --- FUNCIONES PARA INTERACTUAR CON SUPABASE ---

// --- Tabla: gratitudes ---
async function supabaseSaveGratitude(texto) {
    try {
        const { data, error } = await supabase
            .from('gratitudes') // Nombre de tu tabla
            .insert([{ texto: texto }]); // Inserta un objeto con el campo 'texto'

        if (error) throw error;

        console.log('Gratitud guardada:', data);
        cargarGratitudes(); // Recarga la lista después de guardar
    } catch (error) {
        console.error('Error al guardar gratitud:', error.message);
        alert('Error al guardar gratitud: ' + error.message);
    }
}

async function cargarGratitudes() {
    try {
        const { data, error } = await supabase
            .from('gratitudes') // Nombre de tu tabla
            .select('*') // Selecciona todas las columnas
            .order('created_at', { ascending: false }); // Ordena por fecha descendente

        if (error) throw error;

        const listaElement = document.getElementById('listaGratitudes');
        listaElement.innerHTML = ''; // Limpia la lista actual

        if (data && data.length > 0) {
            data.forEach(item => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';
                entryDiv.textContent = item.texto; // Muestra el texto de la gratitud
                listaElement.appendChild(entryDiv);
            });
        } else {            listaElement.innerHTML = '<p>No hay gratitudes registradas aún.</p>';
        }
    } catch (error) {
        console.error('Error al cargar gratitudes:', error.message);
    }
}

// --- Tabla: lecturas ---
async function supabaseSaveReading(texto) {
    try {
        const { data, error } = await supabase
            .from('lecturas') // Nombre de tu tabla
            .insert([{ texto: texto }]);

        if (error) throw error;

        console.log('Lectura guardada:', data);
        cargarLecturas(); // Recarga la lista después de guardar
    } catch (error) {
        console.error('Error al guardar lectura:', error.message);
        alert('Error al guardar lectura: ' + error.message);
    }
}

async function cargarLecturas() {
    try {
        const { data, error } = await supabase
            .from('lecturas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const listaElement = document.getElementById('listaLecturas');
        listaElement.innerHTML = '';

        if (data && data.length > 0) {
            data.forEach(item => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';
                entryDiv.textContent = item.texto;
                listaElement.appendChild(entryDiv);
            });
        } else {
            listaElement.innerHTML = '<p>No hay lecturas registradas aún.</p>';
        }
    } catch (error) {
        console.error('Error al cargar lecturas:', error.message);
    }
}
// --- Tabla: alientos ---
async function supabaseSaveEncouragement(texto) {
    try {
        const { data, error } = await supabase
            .from('alientos') // Nombre de tu tabla
            .insert([{ texto: texto }]);

        if (error) throw error;

        console.log('Aliento guardado:', data);
        cargarAlientos(); // Recarga la lista después de guardar
    } catch (error) {
        console.error('Error al guardar aliento:', error.message);
        alert('Error al guardar aliento: ' + error.message);
    }
}

async function cargarAlientos() {
    try {
        const { data, error } = await supabase
            .from('alientos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const listaElement = document.getElementById('listaAlientos');
        listaElement.innerHTML = '';

        if (data && data.length > 0) {
            data.forEach(item => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';
                entryDiv.textContent = item.texto;
                listaElement.appendChild(entryDiv);
            });
        } else {
            listaElement.innerHTML = '<p>No hay mensajes de aliento registrados aún.</p>';
        }
    } catch (error) {
        console.error('Error al cargar alientos:', error.message);
    }
}
// --- Tabla: metas ---
async function supabaseSaveGoal(texto) {
    try {
        const { data, error } = await supabase
            .from('metas') // Nombre de tu tabla
            .insert([{ texto: texto }]);

        if (error) throw error;

        console.log('Meta guardada:', data);
        cargarMetas(); // Recarga la lista después de guardar
    } catch (error) {
Error al guardar meta:', error.message);
        alert('Error al guardar meta: ' + error.message);
    }
}

async function cargarMetas() {
    try {
        const { data, error } = await supabase
            .from('metas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const listaElement = document.getElementById('listaMetas');
        listaElement.innerHTML = '';

        if (data && data.length > 0) {
            data.forEach(item => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';
                entryDiv.textContent = item.texto;
                listaElement.appendChild(entryDiv);
            });
        } else {
            listaElement.innerHTML = '<p>No hay metas registradas aún.</p>';
        }
    } catch (error) {
        console.error('Error al cargar metas:', error.message);
    }
}

// --- Tabla: racha_oracion ---
async function supabaseIncrementStreak() {
    try {
        // Primero, obtenemos la fila actual de la racha
        const { data: streakData, error: fetchError } = await supabase
            .from('racha_oracion') // Nombre de tu tabla            .select('dias_consecutivos')
            .limit(1);

        if (fetchError) throw fetchError;

        if (!streakData || streakData.length === 0) {
            // Si no hay fila, créala con 1 día
            const { error: insertError } = await supabase
                .from('racha_oracion')
                .insert([{ dias_consecutivos: 1 }]);
            if (insertError) throw insertError;
            actualizarInterfazRacha(1);
            console.log('Primera oración registrada. Días: 1');
            return;
        }

        // Si la fila existe, incrementa el valor
        const currentDays = streakData[0].dias_consecutivos;
        const newDays = currentDays + 1;

        const { error: updateError } = await supabase
            .from('racha_oracion')
            .update({ dias_consecutivos: newDays })
            .eq('id', streakData[0].id); // Actualiza la fila correcta

        if (updateError) throw updateError;

        console.log('Racha incrementada:', newDays);
        actualizarInterfazRacha(newDays);
    } catch (error) {
        console.error('Error al incrementar la racha:', error.message);
        alert('Error al incrementar la racha: ' + error.message);
    }
}

async function cargarRacha() {
    try {
        const { data, error } = await supabase
            .from('racha_oracion')
            .select('dias_consecutivos')
            .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
            const dias = data[0].dias_consecutivos;
            actualizarInterfazRacha(dias);
        } else {
            actualizarInterfazRacha(0);
        }    } catch (error) {
        console.error('Error al cargar la racha:', error.message);
        actualizarInterfazRacha(0);
    }
}

function actualizarInterfazRacha(dias) {
    const diasElement = document.getElementById('diasRacha');
    const progressFill = document.getElementById('progressFill');
    if (diasElement && progressFill) {
        diasElement.textContent = `${dias} días orando juntos 🔥`;
        const maxDias = 100; // Ajusta este valor según lo que consideres un objetivo
        const porcentaje = Math.min(100, (dias / maxDias) * 100);
        progressFill.style.width = `${porcentaje}%`;
    }
}

// --- Tabla: oraciones_respondidas ---
async function supabaseSaveAnsweredPrayer(texto) {
    try {
        const { data, error } = await supabase
            .from('oraciones_respondidas') // Nombre de tu tabla
            .insert([{ texto: texto }]);

        if (error) throw error;

        console.log('Oración respondida guardada:', data);
        cargarOracionesRespondidas(); // Recarga la lista después de guardar
    } catch (error) {
        console.error('Error al guardar oración respondida:', error.message);
        alert('Error al guardar oración respondida: ' + error.message);
    }
}

async function cargarOracionesRespondidas() {
    try {
        const { data, error } = await supabase
            .from('oraciones_respondidas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const listaElement = document.getElementById('listaOracionesRespondidas');
        listaElement.innerHTML = '';

        if (data && data.length > 0) {
            data.forEach(item => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';                entryDiv.textContent = item.texto;
                listaElement.appendChild(entryDiv);
            });
        } else {
            listaElement.innerHTML = '<p>No hay oraciones respondidas registradas aún.</p>';
        }
    } catch (error) {
        console.error('Error al cargar oraciones respondidas:', error.message);
    }
}

// --- Tabla: devocionales ---
async function supabaseSaveDevotionalReflection(texto) {
    try {
        const { data, error } = await supabase
            .from('devocionales') // Nombre de tu tabla
            .insert([{ texto: texto }]);

        if (error) throw error;

        console.log('Reflexión de devocional guardada:', data);
        cargarReflexionDevocional(); // Recarga la reflexión guardada
    } catch (error) {
        console.error('Error al guardar reflexión de devocional:', error.message);
        alert('Error al guardar + error.message);
    }
}

async function cargarReflexionDevocional() {
    try {
        const { data, error } = await supabase
            .from('devocionales')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1); // Trae solo la última reflexión

        if (error) throw error;

        const reflexionElement = document.getElementById('reflexionGuardada');
        if (reflexionElement) {
            if (data && data.length > 0) {
                reflexionElement.innerHTML = `<div class="entry">${data[0].texto}</div>`;
            } else {
                reflexionElement.innerHTML = '<p>No hay reflexiones guardadas aún.</p>';
            }
        }
    } catch (error) {
        console.error('Error al cargar reflexión de devocional:', error.message);
    }
}
// --- Inicialización ---
// Esta función se puede llamar desde index.html para cargar datos iniciales
// Por ejemplo, se llama desde la función 'entrar()' en index.html
window.cargarGratitudes = cargarGratitudes; // Expone la función para que index.html pueda llamarla
window.cargarRacha = cargarRacha;

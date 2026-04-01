// --- CONFIGURACIÓN DE SUPABASE ---
// Tus credenciales REALES
const SUPABASE_URL = 'https://jnpgvmswceibcrdtqrfo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucGd2bXN3Y2VpYmNyZHRxcmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwODI0NjgsImV4cCI6MjA5MDY1ODQ2OH0.8P_jIKYGb5w2WK4KotbZh0MbM-XwB3XEKJF0Nsfi_tk';

// Inicializar Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("✅ app.js - Supabase inicializado correctamente");

// --- FUNCIONES AUXILIARES ---
function nowDate() { 
    return new Date().toLocaleDateString('es'); 
}

// --- FUNCIONES PARA CADA TABLA (usando tus tablas correctas) ---

// 1. GRATITUD (tabla: gratitud)
async function guardarGratitud(texto, usuario) {
    try {
        const { data, error } = await supabase
            .from('gratitud')
            .insert([{ 
                texto: texto,
                user_name: usuario,
                date: nowDate(),
                ts: Date.now()
            }]);
        if (error) throw error;
        console.log('✅ Gratitud guardada');
        return true;
    } catch (error) {
        console.error('❌ Error al guardar gratitud:', error.message);
        return false;
    }
}

async function cargarGratitudes() {
    try {
        const { data, error } = await supabase
            .from('gratitud')
            .select('*')
            .order('ts', { ascending: false });
        if (error) throw error;
        
        const listaElement = document.getElementById('gratitud-list');
        if (listaElement && data) {
            if (data.length === 0) {
                listaElement.innerHTML = '<p class="empty">Aún no hay gratitudes 🌿</p>';
                return;
            }
            listaElement.innerHTML = data.map(item => `
                <div class="item">
                    <div class="item-body">
                        <span class="item-who who-${item.user_name}">${item.user_name === 'luismi' ? '❤️' : '🩷'} ${item.user_name === 'luismi' ? 'Luismi' : 'Lía'}</span>
                        <div class="item-text">${item.texto}</div>
                        <div class="item-meta">${item.date}</div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('❌ Error al cargar gratitudes:', error.message);
    }
}

// 2. PALABRA (lecturas bíblicas) - tabla: palabra
async function guardarLectura(texto, usuario) {
    try {
        const { data, error } = await supabase
            .from('palabra')
            .insert([{ 
                texto: texto,
                user_name: usuario,
                date: nowDate(),
                ts: Date.now()
            }]);
        if (error) throw error;
        console.log('✅ Lectura guardada');
        return true;
    } catch (error) {
        console.error('❌ Error al guardar lectura:', error.message);
        return false;
    }
}

async function cargarLecturas() {
    try {
        const { data, error } = await supabase
            .from('palabra')
            .select('*')
            .order('ts', { ascending: false });
        if (error) throw error;
        
        const listaElement = document.getElementById('palabra-list');
        if (listaElement && data) {
            if (data.length === 0) {
                listaElement.innerHTML = '<p class="empty">Aún no hay lecturas 📖</p>';
                return;
            }
            listaElement.innerHTML = data.map(item => `
                <div class="item">
                    <div class="item-body">
                        <span class="item-who who-${item.user_name}">${item.user_name === 'luismi' ? '❤️' : '🩷'} ${item.user_name === 'luismi' ? 'Luismi' : 'Lía'}</span>
                        <div class="item-text">${item.texto}</div>
                        <div class="item-meta">${item.date}</div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('❌ Error al cargar lecturas:', error.message);
    }
}

// 3. ALIENTO (mensajes) - tabla: aliento
async function guardarAliento(texto, usuario) {
    try {
        const { data, error } = await supabase
            .from('aliento')
            .insert([{ 
                texto: texto,
                user_name: usuario,
                date: nowDate(),
                ts: Date.now()
            }]);
        if (error) throw error;
        console.log('✅ Aliento guardado');
        return true;
    } catch (error) {
        console.error('❌ Error al guardar aliento:', error.message);
        return false;
    }
}

async function cargarAlientos() {
    try {
        const { data, error } = await supabase
            .from('aliento')
            .select('*')
            .order('ts', { ascending: false });
        if (error) throw error;
        
        const listaElement = document.getElementById('aliento-list');
        if (listaElement && data) {
            if (data.length === 0) {
                listaElement.innerHTML = '<p class="empty">Aún no hay mensajes de aliento 💌</p>';
                return;
            }
            listaElement.innerHTML = data.map(item => `
                <div class="msg-item ${item.user_name === 'luismi' ? 'mine' : 'theirs'}">
                    <div class="msg-who" style="color:${item.user_name === 'luismi' ? '#ff0033' : '#ff6eb4'}">${item.user_name === 'luismi' ? '❤️ Luismi' : '🩷 Lía'}</div>
                    <div class="msg-text">${item.texto}</div>
                    <div style="font-size:.72rem;color:#555;margin-top:.3rem">${item.date}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('❌ Error al cargar alientos:', error.message);
    }
}

// 4. METAS - tabla: metas
async function guardarMeta(texto, usuario) {
    try {
        const { data, error } = await supabase
            .from('metas')
            .insert([{ 
                texto: texto,
                user_name: usuario,
                date: nowDate(),
                ts: Date.now(),
                done: false
            }]);
        if (error) throw error;
        console.log('✅ Meta guardada');
        return true;
    } catch (error) {
        console.error('❌ Error al guardar meta:', error.message);
        return false;
    }
}

async function cargarMetas() {
    try {
        const { data, error } = await supabase
            .from('metas')
            .select('*')
            .order('ts', { ascending: false });
        if (error) throw error;
        
        const listaElement = document.getElementById('metas-list');
        if (listaElement && data) {
            if (data.length === 0) {
                listaElement.innerHTML = '<p class="empty">Aún no hay metas 🎯</p>';
                return;
            }
            listaElement.innerHTML = data.map(item => `
                <div class="meta-item">
                    <span class="item-who who-${item.user_name}">${item.user_name === 'luismi' ? '❤️' : '🩷'} ${item.user_name === 'luismi' ? 'Luismi' : 'Lía'}</span>
                    <input type="checkbox" ${item.done ? 'checked' : ''} disabled/>
                    <label class="${item.done ? 'done' : ''}">${item.texto}</label>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('❌ Error al cargar metas:', error.message);
    }
}

// 5. RACHA - tabla: racha
async function incrementarRacha(usuario) {
    try {
        const today = nowDate();
        const { data: rachaData, error: fetchError } = await supabase
            .from('racha')
            .select('*')
            .limit(1);
        
        if (fetchError) throw fetchError;
        
        let racha = rachaData?.[0] || { dias: 0, luismi: false, lia: false, last_date: '' };
        
        if (racha.last_date !== today) {
            racha.luismi = false;
            racha.lia = false;
            racha.last_date = today;
        }
        
        if (racha[usuario]) return false;
        
        racha[usuario] = true;
        
        if (racha.luismi && racha.lia) {
            racha.dias++;
        }
        
        if (rachaData?.[0]) {
            await supabase.from('racha').update(racha).eq('id', rachaData[0].id);
        } else {
            await supabase.from('racha').insert(racha);
        }
        
        console.log('✅ Racha actualizada');
        return true;
    } catch (error) {
        console.error('❌ Error al actualizar racha:', error.message);
        return false;
    }
}

async function cargarRacha() {
    try {
        const { data, error } = await supabase
            .from('racha')
            .select('*')
            .limit(1);
        
        if (error) throw error;
        
        const racha = data?.[0] || { dias: 0, luismi: false, lia: false };
        
        const diasElement = document.getElementById('racha-num');
        const checksElement = document.getElementById('racha-checks');
        
        if (diasElement) diasElement.textContent = racha.dias;
        if (checksElement) {
            checksElement.innerHTML = (racha.luismi ? '❤️' : '🤍') + ' ' + (racha.lia ? '🩷' : '🩶');
        }
        
        return racha;
    } catch (error) {
        console.error('❌ Error al cargar racha:', error.message);
        return { dias: 0, luismi: false, lia: false };
    }
}

// --- EXPORTAR FUNCIONES PARA USAR EN index.html ---
window.guardarGratitud = guardarGratitud;
window.cargarGratitudes = cargarGratitudes;
window.guardarLectura = guardarLectura;
window.cargarLecturas = cargarLecturas;
window.guardarAliento = guardarAliento;
window.cargarAlientos = cargarAlientos;
window.guardarMeta = guardarMeta;
window.cargarMetas = cargarMetas;
window.incrementarRacha = incrementarRacha;
window.cargarRacha = cargarRacha;

console.log("✅ app.js - Todas las funciones cargadas");
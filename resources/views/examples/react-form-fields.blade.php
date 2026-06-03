{{--
    Contoh pemakaian React island components di Blade form biasa.
    File ini hanya contoh. Pastikan resources/js/app.jsx sudah diload lewat @vite di layout Blade.
--}}

<form method="POST" action="{{ route('study-sessions.store') }}" enctype="multipart/form-data" class="cm-card cm-panel grid gap-5">
    @csrf

    <div>
        <label for="title" class="cm-label">Judul Study Session</label>
        <input id="title" name="title" type="text" class="cm-input" placeholder="Contoh: Belajar Basis Data" required>
    </div>

    {{-- Subject dibuat input biasa, bukan dropdown --}}
    <div>
        <label for="subject" class="cm-label">Subject</label>
        <input id="subject" name="subject" type="text" class="cm-input" placeholder="Contoh: Database Systems" required>
    </div>

    {{-- Dropdown custom React untuk mode create study --}}
    <div
        data-react-select-dropdown
        data-name="mode"
        data-label="Mode Study"
        data-placeholder="Pilih mode study"
        data-required="true"
        data-options='[
            {"value":"offline","label":"Offline","caption":"Ketemu langsung di kampus","icon":"📍"},
            {"value":"online","label":"Online","caption":"Pakai Google Meet / Zoom","icon":"💻"},
            {"value":"hybrid","label":"Hybrid","caption":"Bebas online atau offline","icon":"🔁"}
        ]'
    ></div>

    <div
        data-react-date-picker
        data-name="session_date"
        data-label="Tanggal Session"
        data-placeholder="Pilih tanggal session"
        data-required="true"
    ></div>

    <div class="grid gap-5 md:grid-cols-2">
        <div
            data-react-time-picker
            data-name="start_time"
            data-label="Jam Mulai"
            data-placeholder="Pilih jam mulai"
            data-required="true"
            data-step="30"
        ></div>

        <div
            data-react-time-picker
            data-name="end_time"
            data-label="Jam Selesai"
            data-placeholder="Pilih jam selesai"
            data-required="true"
            data-step="30"
        ></div>
    </div>

    <div
        data-react-image-upload
        data-name="photo"
        data-label="Foto / Poster Session"
        data-placeholder="Klik untuk upload foto session"
        data-accept="image/*"
    ></div>

    <button type="submit" class="cm-btn cm-btn-primary justify-self-start">Simpan</button>
</form>

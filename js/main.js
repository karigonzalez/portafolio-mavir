document.addEventListener("DOMContentLoaded", () => {
    
    // Datos simulados alineados a Mavir School
    const mavirData = [
        { id: "MAV-001", name: "Familia Quispe - Alumno Diego", concept: "Colegiatura Octubre", amount: "S/. 450", status: "conciliado", action: "Boleta Emitida" },
        { id: "MAV-002", name: "Familia Mendoza - Alumna Sofía", concept: "Colegiatura Octubre", amount: "S/. 450", status: "pendiente", action: "Verificar Comprobante Yape" },
        { id: "MAV-003", name: "Familia Huamán - Alumno Mateo", concept: "Cuota Pendiente + Mora", amount: "S/. 900", status: "mora", action: "Llamada de Cobranza (Acuerdo)" },
        { id: "MAV-004", name: "Familia Morales - Alumna Camila", concept: "Colegiatura Octubre", amount: "S/. 450", status: "conciliado", action: "Boleta Emitida" },
        { id: "MAV-005", name: "Familia Rivas - Alumno Lucas", concept: "Colegiatura Octubre", amount: "S/. 450", status: "pendiente", action: "Validar Transferencia BCP" }
    ];

    const tableBody = document.querySelector("#paymentsTable tbody");

    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach(item => {
            const row = document.createElement("tr");
            
            let badge = "";
            if(item.status === "conciliado") badge = `<span class="badge-status conciliado">Conciliado & Aplicado</span>`;
            else if(item.status === "pendiente") badge = `<span class="badge-status pendiente">Por Conciliar</span>`;
            else badge = `<span class="badge-status mora">En Morosidad</span>`;

            row.innerHTML = `
                <td><strong>${item.id}</strong></td>
                <td>${item.name}</td>
                <td>${item.concept}</td>
                <td>${item.amount}</td>
                <td>${badge}</td>
                <td><small>${item.action}</small></td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTable(mavirData);

    // Filtrar por Estado
    document.getElementById("statusFilter").addEventListener("change", (e) => {
        const val = e.target.value;
        if(val === "all") {
            renderTable(mavirData);
        } else {
            const filtered = mavirData.filter(d => d.status === val);
            renderTable(filtered);
        }
    });

    // Gráfico 1: Recaudación Mensual
    const ctxRecaudacion = document.getElementById('chartRecaudacion').getContext('2d');
    new Chart(ctxRecaudacion, {
        type: 'bar',
        data: {
            labels: ['Jul', 'Ago', 'Set', 'Oct'],
            datasets: [{
                label: 'Meta de Recaudación (S/.)',
                data: [25000, 25000, 25000, 25000],
                backgroundColor: 'rgba(0, 59, 112, 0.3)',
                borderColor: '#003B70',
                borderWidth: 1
            }, {
                label: 'Monto Recaudado & Conciliado (S/.)',
                data: [24500, 24800, 24200, 23500],
                backgroundColor: '#F39200',
                borderColor: '#F39200',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    // Gráfico 2: Cartera
    const ctxCartera = document.getElementById('chartCartera').getContext('2d');
    new Chart(ctxCartera, {
        type: 'doughnut',
        data: {
            labels: ['Pagos Conciliados', 'Pendientes de Validación', 'Cartera Morosa'],
            datasets: [{
                data: [82, 12, 6],
                backgroundColor: ['#065F46', '#F39200', '#991B1B']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // Botón de Simulación de Abono
    document.getElementById("btnProcessPayment").addEventListener("click", () => {
        alert("¡Abono verificado y conciliado exitosamente! Comprobante registrado y aplicado en el sistema.");
    });
});
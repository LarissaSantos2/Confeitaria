window.addEventListener('load', () => {
    const total = parseFloat(localStorage.getItem('total'));

    if (!isNaN(total)) {
        document.getElementById('valor').textContent = `Valor Total: R$ ${total.toFixed(2)}`;
    } else {
        document.getElementById('valor').textContent = 'Nenhuma informação encontrada.';
    }
});

document.getElementById('frm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const tel = document.getElementById('tel').value;
    const unid = document.getElementById('unid').value;
    const obs = document.getElementById('obs').value;
    const totalBruto = parseFloat(localStorage.getItem('total'));
    const total = isNaN(totalBruto) ? 0 : parseFloat(totalBruto.toFixed(2));

    // OBJETO DE REGISTRO
    const novoRegistro = {
        nome: nome,
        tel: tel,
        unid: unid,
        obs: obs,
        total: total
    };

    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(novoRegistro);
    localStorage.setItem('registros', JSON.stringify(registros));

    document.getElementById('frm').reset();
    window.location.href = 'Pedidos.html';
});
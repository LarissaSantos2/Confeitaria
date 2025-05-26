 function exibirRegistros() {
                const registros = JSON.parse(localStorage.getItem('registros')) || [];
                const display = document.getElementById('display');
                
                display.innerHTML = '';
    

                registros.forEach((registro, index) => {
    
                    const div = document.createElement('div');
                    div.className = 'registros';
                    div.innerHTML = `
                        <br><p class="pnome">${registro.nome}</p><br>
                        <hr>
                        <p class="pvalores">Telefone: ${registro.tel}<br>
                        Unidade: ${registro.unid}<br>
                        OBS: ${registro.obs}<br>
                        Valor Total: ${registro.total}</p>
                        <center><button class="btRemove" onclick="apagarRegistro(${index})">Cancelar</button>
                        <button class="btAtende" onclick="Atender(${index})">Retirar Pedido</button></center><br><br>
                    `;
                    display.appendChild(div);
                });
            }

            function apagarRegistro(index) {
                var registros = JSON.parse(localStorage.getItem('registros')) || [];

                registros.splice(index, 1);
        
                localStorage.setItem('registros', JSON.stringify(registros));

                exibirRegistros();
            }


        function Atender(index) {
            var registros = JSON.parse(localStorage.getItem('registros')) || [];

            const atender = registros.splice(index, 1)[0];
      
            localStorage.setItem('registros', JSON.stringify(registros));
            

            document.getElementById('nomeAtendido').innerHTML = `${atender.nome}`;
            exibirRegistros();
        }

        window.onload = exibirRegistros();
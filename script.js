document.getElementById('downloadPdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const checklistForm = document.getElementById('checklistForm');
    const formData = new FormData(checklistForm);

    let content = 'Checklist de Recebimento de Veículo\n\n';

    function addTextToPdf(text) {
        const margin = 10;
        const maxWidth = doc.internal.pageSize.width - 2 * margin;
        let y = 10;

        text.split('\n').forEach(line => {
            const splitText = doc.splitTextToSize(line, maxWidth);
            splitText.forEach(textLine => {
                if (y + 10 > doc.internal.pageSize.height - margin) {
                    doc.addPage();
                    y = margin;
                }
                doc.text(textLine, margin, y);
                y += 10;
            });
        });
    }

    // Function to format checkboxes
    function getCheckboxStatus(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
        let status = '';
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                status += checkbox.nextElementSibling.textContent + ', ';
            }
        });
        return status.slice(0, -2); // Remove trailing comma and space
    }

    // Function to format radio buttons
    function getRadioStatus(name) {
        const radios = document.querySelectorAll(`input[name="${name}"]:checked`);
        return radios.length > 0 ? radios[0].nextElementSibling.textContent : 'Não selecionado';
    }

    // Function to format text inputs
    function getTextInputStatus(name) {
        const input = document.querySelector(`input[name="${name}"]`);
        return input ? input.value : 'Não preenchido';
    }

    // Function to format the state of checkboxes
    function formatCheckboxes(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
        let status = '';
        checkboxes.forEach(checkbox => {
            status += `${checkbox.nextElementSibling.textContent}: ${checkbox.checked ? 'Sim' : 'Não'}\n`;
        });
        return status;
    }

    content += 'Recebimento de Veículo\n';
    content += `Nome do cliente: ${getTextInputStatus('nomeCliente')}\n`;
    content += `Modelo do veículo: ${getTextInputStatus('modeloVeiculo')}\n`;
    content += `Responsável: ${getTextInputStatus('responsavel')}\n`;
    content += `Telefone: ${getTextInputStatus('telefone')}\n\n`;

    content += 'Conferência Física\n';
    content += `Literatura de bordo: ${getCheckboxStatus('literatura')}\n`;
    content += `Discos de tacógrafo: ${getCheckboxStatus('tacografo')}\n`;
    content += `Combustível: ${getRadioStatus('combustivel')}\n`;
    content += `Alavanca: ${getCheckboxStatus('alavanca')}\n`;
    content += `Spoiler dianteiro: ${getCheckboxStatus('spoilerDianteiro')}\n`;
    content += `Extintor: ${getCheckboxStatus('extintor')}\n`;
    content += `Triângulo: ${getCheckboxStatus('triangulo')}\n`;
    content += `Pino engate: ${getCheckboxStatus('pinoEngate')}\n`;
    content += `Acendedor de cigarros: ${getCheckboxStatus('acendedorCigarros')}\n`;
    content += `Antena: ${getCheckboxStatus('antena')}\n`;
    content += `Mangueira de ar: ${getCheckboxStatus('mangueiraAr')}\n`;
    content += `Ferramentas: ${getCheckboxStatus('ferramentas')}\n`;
    content += `Rádio: ${getCheckboxStatus('radio')}\n`;
    content += `Toca CD (MP3): ${getCheckboxStatus('tocaCd')}\n`;
    content += `Documentos: ${getCheckboxStatus('documentos')}\n`;
    content += `Chaves tanque: ${getCheckboxStatus('chavesTanque')}\n`;
    content += `Rodocar: ${getCheckboxStatus('rodocar')}\n`;
    content += `Porta objetos: ${getCheckboxStatus('portaObjetos')}\n`;
    content += `Tampa reservatório: ${getCheckboxStatus('tampaReservatorio')}\n`;
    content += `Vidros laterais: ${getCheckboxStatus('vidrosLaterais')}\n`;
    content += `Tomada de luz: ${getCheckboxStatus('tomadaLuz')}\n`;
    content += `Equipamento: ${getCheckboxStatus('equipamento')}\n`;
    content += `Chaves contato: ${getCheckboxStatus('chavesContato')}\n`;
    content += `Vareta de óleo: ${getCheckboxStatus('varetaOleo')}\n`;
    content += `Para-brisa (Dianteiro/Traseiro): ${getCheckboxStatus('paraBrisa')}\n`;
    content += `Cabina: ${getCheckboxStatus('cabina')}\n`;
    content += `Pintura danificada: ${getCheckboxStatus('pinturaDanificada')}\n`;
    content += `Amassada: ${getCheckboxStatus('amassada')}\n`;
    content += `Forração em bom estado: ${getCheckboxStatus('forracaoBomEstado')}\n`;
    content += `Limpeza interna/Externa: ${getCheckboxStatus('limpezaInternaExterna')}\n`;
    content += `Vidros em boas condições: ${getCheckboxStatus('vidrosBoasCondicoes')}\n`;
    content += `Tacógrafo em boas condições: ${getCheckboxStatus('tacografoBoasCondicoes')}\n`;
    content += `Grade em boa condição: ${getCheckboxStatus('gradeBoaCondicao')}\n`;
    content += `Quebra-sol em boa condição: ${getCheckboxStatus('quebraSolBoaCondicao')}\n`;
    content += `Bancos completos: ${getCheckboxStatus('bancosCompletos')}\n`;
    content += `Estofamentos em bom estado: ${getCheckboxStatus('estofamentosBomEstado')}\n`;
    content += `Para-choques em boas condições: ${getCheckboxStatus('paraChoquesBoasCondicoes')}\n`;
    content += `Emblemas completos: ${getCheckboxStatus('emblemasCompletos')}\n`;
    content += `Cinzeiro - Falante: ${getCheckboxStatus('cinzeiroFalante')}\n`;

    content += 'Elétrica Básica\n';
    content += `Painel de instrumentos: ${getCheckboxStatus('painelInstrumentos')}\n`;
    content += `Luz de falha acesa: ${getCheckboxStatus('luzFalhaAcesa')}\n`;
    content += `Faróis: ${getCheckboxStatus('farois')}\n`;
    content += `Lanternas: ${getCheckboxStatus('lanternas')}\n`;
    content += `Luzes indicadoras: ${getCheckboxStatus('luzesIndicadoras')}\n`;

    content += 'Pneus\n';
    content += `Mesma marca e modelo? ${getCheckboxStatus('marcaModeloPneus')}\n`;
    content += `Dianteiros - Estado geral: ${getRadioStatus('estadoDianteiros')}\n`;
    content += `Traseiros - Estado geral: ${getRadioStatus('estadoTraseiros')}\n`;
    content += `Estepe - Estado geral: ${getRadioStatus('estadoEstepe')}\n`;

    content += 'Equipamentos\n';
    content += `Possui equipamentos? ${getCheckboxStatus('equipamentosPossui')}\n`;
    content += `Qual? ${getTextInputStatus('equipamentosQual')}\n`;
    content += `Estado geral? ${getTextInputStatus('equipamentosEstadoGeral')}\n`;
    content += `Equipamentos: ${getCheckboxStatus('equipamentos')}\n`;

    content += 'Declaro que entreguei o veículo de acordo com as considerações relatadas neste termo.\n';
    content += `Declaração: ${getCheckboxStatus('declaracao')}\n\n`;

    content += 'Declaração\n';
    content += `Assinatura do cliente: ${getTextInputStatus('assinaturaCliente')}\n`;

    content += 'Autorização de retirada do veículo\n';
    content += `Data: ${getTextInputStatus('data')}\n`;
    content += `Hora entrada: ${getTextInputStatus('horaEntrada')}\n`;
    content += `Placa: ${getTextInputStatus('placa')}\n`;
    content += `Cor: ${getTextInputStatus('cor')}\n`;
    content += `Hora saída: ${getTextInputStatus('horaSaida')}\n`;
    content += `Modelo: ${getTextInputStatus('modelo')}\n`;
    content += `Nº OS: ${getTextInputStatus('nOs')}\n`;
    content += `Consultor técnico: ${getTextInputStatus('consultorTecnico')}\n`;
    content += `Guincho: ${getTextInputStatus('guincho')}\n`;

    addTextToPdf(content);
    doc.save('checklist.pdf');
});

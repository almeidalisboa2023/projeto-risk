// Identificação de quem vende (Decreto 7.962/2013). Preencha "documento" com o CPF ou o CNPJ para ele aparecer no rodapé.
export const FORNECEDOR = {
  nome: 'Lucas Matheus de Almeida',
  documento: '',
  cidade: 'Pirapora/MG',
  email: 'almeidalisboa2023@gmail.com',
};
export const rodapeLegal = () => `<footer class="pub-rodape">
  <div><b>PROJETO R.I.S.K.</b> · Responsável: ${FORNECEDOR.nome}${FORNECEDOR.documento ? ' · ' + FORNECEDOR.documento : ''} · ${FORNECEDOR.cidade}</div>
  <div>Contato: <a href="mailto:${FORNECEDOR.email}">${FORNECEDOR.email}</a> · <a href="termos.html">Termos de Uso</a> · <a href="privacidade.html">Política de Privacidade</a></div>
  <div class="muted">Pagamentos processados pela Hotmart. Arrependimento em até 7 dias após a compra, com devolução integral (CDC, art. 49).</div>
</footer>`;

"use client";

import Link from "next/link";

export default function TermosDeUso() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center">
      {/* Card centralizado */}
      <div className="bg-black/20 backdrop-blur-md rounded-3xl max-w-4xl w-full px-12 py-16 text-white shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Termos de Uso</h1>

        <p className="mb-6 leading-relaxed">
          Bem-vindo ao <strong>FonteDosPlugins</strong>! Este site disponibiliza plugins de terceiros que podem
          estar **modificados ou crackeados**, ou seja, sem a necessidade de licença oficial.
          Ao acessar e utilizar nosso site, você reconhece e concorda que o uso destes plugins é **por sua conta e risco**, 
          e que você deve respeitar a legislação vigente de direitos autorais em seu país.
        </p>

        <p className="mb-6 leading-relaxed">
          Todos os plugins disponíveis no <strong>FonteDosPlugins</strong> são **verificados e considerados seguros**, 
          livres de vírus ou malwares conhecidos. No entanto, não garantimos compatibilidade com todos os sistemas ou softwares.
        </p>

        <h2 className="text-2xl mb-4 mt-8 text-gray-200">1. Uso do site</h2>
        <p className="mb-4 leading-relaxed">
          O usuário concorda em utilizar o site apenas para fins **legais e pessoais**. É proibido distribuir,
          comercializar ou reivindicar a autoria dos plugins disponibilizados. O <strong>FonteDosPlugins </strong> 
          não se responsabiliza por qualquer uso ilegal, perdas, danos ou consequências decorrentes do uso destes plugins.
        </p>

        <h2 className="text-2xl mb-4 mt-8 text-gray-200">2. Propriedade intelectual</h2>
        <p className="mb-4 leading-relaxed">
          Todos os plugins, textos, imagens, vídeos e materiais do site são propriedade de seus desenvolvedores originais
          ou licenciados de terceiros. O <strong>FonteDosPlugins</strong> atua apenas como um repositório de acesso. 
          A reprodução, distribuição ou comercialização sem autorização é **proibida e ilegal**.
        </p>

        <h2 className="text-2xl mb-4 mt-8 text-gray-200">3. Responsabilidade</h2>
        <p className="mb-4 leading-relaxed">
          O <strong>FonteDosPlugins</strong> não se responsabiliza por qualquer problema técnico, legal ou financeiro
          decorrente do uso de plugins crackeados ou modificados. Usuários são responsáveis por suas ações e pelo cumprimento da lei.
        </p>

        <h2 className="text-2xl mb-4 mt-8 text-gray-200">4. Alterações</h2>
        <p className="mb-4 leading-relaxed">
          Podemos alterar estes termos a qualquer momento. Recomendamos que consulte esta página periodicamente.
        </p>

        <h2 className="text-2xl mb-4 mt-8 text-gray-200">5. DMCA e Direitos Autorais</h2>
        <p className="mb-4 leading-relaxed">
          O <strong>FonteDosPlugins</strong> respeita os direitos autorais de terceiros. Se você acredita que algum conteúdo
          publicado em nosso site viola seus direitos de propriedade intelectual, envie uma notificação de remoção conforme 
          a <strong>Lei de Direitos Autorais do Milênio Digital (DMCA)</strong> para 
          <a href="mailto:suporte@fontedosplugins.com.br" className="text-blue-400 hover:underline"> suporte@fontedosplugins.com.br</a>.
        </p>
        <p className="mb-4 leading-relaxed">
          Nossa equipe analisará a notificação e tomará as medidas cabíveis, incluindo a remoção do conteúdo infrator.
        </p>

        {/* Botão voltar */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 border border-white/40 rounded-full text-white hover:bg-white/10 transition"
          >
            Voltar à Home
          </Link>
        </div>
      </div>
    </main>
  );
}

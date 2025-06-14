import { Container } from '../../components/container'
import { GenericHTML } from '../../components/generic-html'
import { Heading } from '../../components/heading'
import { MainTemplate } from '../../templates/main-template'
import { RouterLink } from '../../components/router-link'
import { useEffect } from 'react'

export function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada - Chronos Pomodoro'
  }, [])

  return (
    <MainTemplate>
      <Container>
        <GenericHTML>
          <Heading>404 - Página não encontrada 🚀</Heading>
          <p>
            Opa! Parece que a página que você está tentando acessar não existe.
            Talvez ela tenha tirado férias, resolvido explorar o universo ou se
            perdido em algum lugar entre dois buracos negros. 🌌
          </p>
          <p>
            Mas calma, você não está perdido no espaço (ainda). Dá pra voltar em
            segurança para a <a href="/">página principal</a> ou{' '}
            <RouterLink href="/history">para o histórico</RouterLink> — ou pode
            ficar por aqui e fingir que achou uma página secreta que só os
            exploradores mais legais conseguem acessar. 🧭✨
          </p>
          <p>
            Se você acha que essa página deveria existir (ou se quiser bater um
            papo sobre viagem no tempo e buracos de minhoca), é só entrar em
            contato. Caso contrário, use o menu para voltar ao mundo real.
          </p>
          <p>
            Enquanto isso, fica aqui uma reflexão: "Se uma página não existe na
            internet, será que ela existiu de verdade?" 🤔💭
          </p>
        </GenericHTML>
      </Container>
    </MainTemplate>
  )
}

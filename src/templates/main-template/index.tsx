import { Container } from '../../components/container'
import { Footer } from '../../components/footer'
import { Logo } from '../../components/logo'
import { Menu } from '../../components/menu'
import { PropsWithChildren } from 'react'

export function MainTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}
      <Container>
        <Footer />
      </Container>
    </>
  )
}

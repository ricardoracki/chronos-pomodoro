import { Link } from 'react-router'

type RouterLinkProps = React.ComponentProps<'a'> & {
  href: string
}

export function RouterLink({ href, ...props }: RouterLinkProps) {
  return <Link to={href} {...props} />
}

/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';

type NextComposedProps = {
  as: string | any;
  href: string | any;
  prefetch?: boolean;
};

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  function NextComposed(props, ref) {
    const { as, href, ...other } = props;

    return (
      <NextLink href={href} as={as}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
);

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: any) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  );
}

const ForwardedRefLink: React.FC<any> = React.forwardRef<
  HTMLAnchorElement,
  NextComposedProps
>((props, ref) => <Link {...props} innerRef={ref} />);

export default ForwardedRefLink;

import classes from './StaticView.module.css';

export function StaticView({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={classes.staticview} style={style}>
      {children}
    </div>
  );
}

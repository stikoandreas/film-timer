import classes from './StaticView.module.css';

export function StaticView({ children }: { children: React.ReactNode }) {
  return <div className={classes.staticview}>{children}</div>;
}

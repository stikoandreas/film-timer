import classes from './ScrollableView.module.css';

export function ScrollableView({ children }: { children: React.ReactNode }) {
  return <div className={classes.scrollableview}>{children}</div>;
}

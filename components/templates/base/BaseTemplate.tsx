import styles from './BaseTemplate.module.css';

// eslint-disable-next-line
export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = () => {
  return <div className={styles.component}>Hello world!</div>;
};

export default BaseTemplate;

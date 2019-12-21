// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts'). 
declare module '*.scss'; 

declare const VERSION_DATA: {
    commit: string;
    version: string;
    createdAt: string;
};
declare module '*.css' {}
declare module '*.png' {
    const filePath: string;
    export default filePath;
}

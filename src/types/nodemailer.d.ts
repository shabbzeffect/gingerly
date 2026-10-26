declare module "nodemailer" {
  const nodemailer: {
    createTransport: (opts: any) => any;
  };
  export default nodemailer;
}

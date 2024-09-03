/** @type { import("drizzle-kit").Config } */

export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://interview-saathi_owner:CGWTaAFVfc18@ep-hidden-fog-a5017rho.us-east-2.aws.neon.tech/interview-saathi?sslmode=require'
    }
};
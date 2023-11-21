module.exports = {
    apps: [
        {
            name: 'nest-api',
            script: 'node_modules/nx/bin/nx.js',
            args: 'run nest-api:serve:production',
            instances: 1,
            exec_mode: 'cluster',
            out_file: './logs/nest-api-out.log',
            error_file: './logs/nest-api-error.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
    ],
};

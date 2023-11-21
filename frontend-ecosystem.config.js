module.exports = {
    apps: [
        {
            name: 'frontend',
            script: 'node_modules/nx/bin/nx.js',
            args: 'run frontend:serve:production',
            instances: 1,
            out_file: './logs/frontend-out.log',
            error_file: './logs/frontend-error.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
    ],
};

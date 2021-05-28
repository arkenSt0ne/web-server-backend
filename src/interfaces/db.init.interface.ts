export interface DB_INIT {
    init_db(): boolean;
    check_conn(): Promise<boolean>;
    get_conn(): unknown;
}
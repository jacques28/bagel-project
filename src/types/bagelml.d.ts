declare module 'bagelml' {

  interface BagelAsset {
    id: string;
    title: string;
    category?: string;
    details?: string;
    tags?: string[];
    
  }

  export class Settings {
    constructor(config: { bagel_api_impl: string; bagel_server_host: string });
  }

  export class Client {
    constructor(settings: Settings);

   
    // create_asset(payload: {
    //   dataset_type: string;
    //   title: string;
    //   category: string;
    //   details: string;
    //   tags: string[];
    //   userId: string;
    // }, apiKey: string): Promise<{ id: string; [key: string]: any }>;

    get_all_assets(userId: string, apiKey: string): Promise<BagelAsset[]>;
    create_asset(payload: any, apiKey: string): Promise<BagelAsset>;

    get_asset_by_Id(assetId: string, apiKey: string): Promise<{ id: string; [key: string]: any }>;
    // get_all_assets(userId: string, apiKey: string): Promise<Array<{ id: string; name: string; [key: string]: any }>>;
    update_asset(assetId: string, payload: any, apiKey: string): Promise<any>;
    delete_asset(assetId: string, apiKey: string): Promise<any>;

    // Data management
    add_file(assetId: string, file: Blob | string, apiKey: string): Promise<any>;
    add_data_to_asset(assetId: string, payload: any, apiKey: string): Promise<any>;

    // Querying
    query_asset(assetId: string, payload: any, apiKey: string): Promise<any>;

    // Fine-tuning
    fine_tune(payload: any, apiKey: string): Promise<{ modelAssetId: string; [key: string]: any }>;

    // File management
    download_model_file(assetId: string, fileName: string, apiKey: string): Promise<any>;

    // Job management
    get_job_by_asset(assetId: string, apiKey: string): Promise<any>;
    get_job(jobId: string, apiKey: string): Promise<any>;
    list_jobs(userId: string, apiKey: string): Promise<any>;

    // Model management
    list_model_files(assetId: string, apiKey: string): Promise<any>;
    
    // User management
    get_user_details(userId: string, apiKey: string): Promise<any>;
    create_api_key(apiKeyName: string, userId: string): Promise<any>;
  }
}
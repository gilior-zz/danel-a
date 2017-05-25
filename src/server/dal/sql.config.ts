export let Home = {
    conn_str_support: 'Driver={SQL Server Native Client 11.0};Server={USER-PC\\SQL};Database={info};Trusted_Connection={yes};',
    conn_str_dev: 'Driver={SQL Server Native Client 11.0};Server={USER-PC\\SQL};Database={info};Trusted_Connection={yes};',
}
export let Danel = {
    conn_str_support: 'Driver={SQL Server Native Client 11.0};Server={DANEL-DB\\S16};Database={support_new};Trusted_Connection={yes};',
    conn_str_dev: 'Driver={SQL Server Native Client 11.0};Server={DANEL-TS\\DEV2008R2};Database={DanelX};Trusted_Connection={yes};',
    conn_str_srvs: 'DANEL-DB;DANEL-DB\\S16;DANEL-QA\\S12;DANEL-QA\\S14',
    env_proc: `EXECUTE master.sys.sp_MSforeachdb 'USE [?];
	                                   IF OBJECT_ID(N''dbo.DatabaseVersions'', N''U'') IS NOT NULL 
									   BEGIN        
									   SELECT  DB_NAME() DB_NAME                                   
									          , [MajorVersion]     
											  ,[MinorVersion] 
											  ,[SubVersion]     
											  ,[BuildNumber]                  
											  ,(select [InstallPath] from [dbo].[ConfigAddresses] where [ComponentName]=''DanelXClient'') clientLocation 
											   ,(select [ServerName] from [dbo].[ConfigAddresses] where [ComponentName]=''DanelXServer'') serverName     
											    FROM DatabaseVersions                                       
												WHERE VersionID = (select max(VersionID) from DatabaseVersions)   
												ORDER BY MajorVersion DESC ,
														MinorVersion DESC ,
														SubVersion DESC ,
														BuildNumber DESC 
										END'`
}

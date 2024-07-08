// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use tauri::api::path::resource_dir;


fn main() {
  tauri::Builder::default()
     .setup(|app| {

        let backend_path = app.path_resolver()
                                    .resolve_resource("backend.bundle.js")
                                    .expect("failed to resolve resource");

                                    if let Some(path_str) = backend_path.to_str() {

        Command::new("node")
          .args(&["--experimental-specifier-resolution=node", &path_str])
          .spawn()
          .expect("failed to start backend");
                                        }
                                     else {
                                             eprintln!("Failed to convert path to &str");
                                         }


        Ok(())
      })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

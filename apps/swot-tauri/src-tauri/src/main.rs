// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Child};
use std::sync::{Mutex, Arc};

fn main() {
  // Use an Arc<Mutex<>> to share the child process handle between threads
  let child_process = Arc::new(Mutex::new(None));

  tauri::Builder::default()
    .setup({
      let child_process = Arc::clone(&child_process);
      move |app| {
        let backend_path = app.path_resolver()
          .resolve_resource("dist/main.js")
          .expect("failed to resolve resource");

        if let Some(path_str) = backend_path.to_str() {
          let child = Command::new("node")
            .args(&[path_str, "| pino pretty"])
            .spawn()
            .expect("failed to start backend");

          // Store the child process handle
          *child_process.lock().unwrap() = Some(child);
        } else {
          eprintln!("Failed to convert path to &str");
        }

        Ok(())
      }
    })
    .build(tauri::generate_context!())
    .expect("error while running tauri application")
    .run({
      let child_process = Arc::clone(&child_process);
      move |app_handle, e| {
        if let tauri::RunEvent::ExitRequested { .. } = e {
          if let Some(mut child) = child_process.lock().unwrap().take() {
            // Kill the child process on exit
            let _ = child.kill();
          }
        }
      }
    });
}

1. Installing Rust
   https://rust-lang.org/tools/install/

2. Press 1 and Check the Versions
   rustc --version
   cargo --version

3. to run the rust file name Variables.rs  
   Command :rustc Variables.rs

   or make a Cargo Project cargo new ProjectName(snake_case)
   and then go to cd project_name
   and write cargo run

4. To temporarirly add the Rust Path to our Terminal so that this point 3 Command
   should run Properly

   $env:Path += ";C:\Users\rjhk6\.cargo\bin"

5. Adding it in Enviournment Path Variable Permanently
   Path phrase:C:\Users\rjhk6\.cargo\bin

<!-- Step 5: Quick benefits of Cargo

Like npm start → just cargo run

Manages dependencies (like Cargo.toml)

Can build optimized release builds (cargo build --release)

Works seamlessly with VS Code and Rust Analyzer -->

/* fn main() {
    let mut a=100;
    println!("Hello, world! a={}",a);
    
    a=200;
    println!("Hello, world! a={}",a);
} */

fn main(){
    // specificying the variable typewith size also 
    // i.e integer of 8 bits 
    // let a:i8=100;
    // let c:i16=10000;
    // println!("a={} b={}" ,a,c);

    // Char size is 4 bytes because  Max size of Char is 4 bytes 
    // hence to make it static and store in stack so that if in future 
    // data changes so no issue of space and Memory isssue 
    // i.e Managing the worst case

    let str=String::from ("Rohit Negi w😊");
    println!("String Size={} bytes",str.len());
}

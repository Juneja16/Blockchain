fn main() {
    let s = String::from("hello");

    takes_ownership(s); // `s`'s ownership is moved into the function...
                        // ...and so `s` is no longer valid here.

    let x = 5;

    makes_copy(x);      // `x` is a type with the `Copy` trait, so a copy is made.
                        // `x` is still valid here and can be used.

    // This would fail! `s` was moved.
    // println!("{}", s);

    println!("{}", x); // This works.
}

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // Here, some_string goes out of scope and `drop` is called. The memory is freed.

fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.
// A Room value is exactly one of these four strings.
// It is impossible for a Room variable to contain any other string.
type Room = "A" | "B" | "C" | "Exit";

function input_name(): string {
  console.warn("Please enter your name.");
  let name: string | null = prompt("Please enter your name.");
  while (name == null || name == "") {
    console.error("Invalid input.");
    name = prompt("Please enter your name.");
  }
  console.log(name);
  return name;
}

function input_command(): string {
  console.warn("Please enter a command.");
  let command: string | null = prompt("Please enter a command.");
  while (command == null || command == "") {
    console.error("Invalid input.");
    command = prompt("Please enter a command.");
  }
  console.log(command);
  return command;
}

function check_room_key(
  room_check: Room,
  command_check: string,
  key_check: boolean
): Room {
  if (room_check == "A") {
    if (command_check == "east") {
      room_check = "B";
      console.info(
        "You go through the east door. You are in a room with a table."
      );
      if (!key_check) {
        console.info("On the table there is a key.");
      }
      console.info("There is a door on the west wall of this room.");
    } else if (command_check == "south") {
      if (key_check) {
        room_check = "C";
        console.info(
          "You unlock the south door with the key and go through the door."
        );
        console.info(
          "You are in a bright room. There is a door on the north wall of this room and a window on the east wall."
        );
      } else {
        console.error("You try to open the south door, but it is locked.");
      }
    }
  }

  if (room_check == "B") {
    if (command_check == "west") {
      room_check = "A";
      console.info(
        "You are in an empty room. There are doors on the south and east walls of this room."
      );
    }
  }

  if (room_check == "C") {
    if (command_check == "north") {
      room_check = "A";
      console.info(
        "You are in an empty room. There are doors on the south and east walls of this room."
      );
    } else if (command_check == "east") {
      if (key_check) {
        room_check = "Exit";
        console.info("You step out from the open window.");
      } else {
        console.error("The window is closed.");
      }
    }
  }

  return room_check;
}

function window_check(
  room_check: Room,
  command_check: string,
  open_check: boolean
): boolean {
  if (room_check == "C" && command_check == "open window"){
    if (open_check) {
      console.error("The window is already open.");
    } else {
      console.info("You open the window.");
      open_check = true;
    }
  }
  return open_check;
}

export function play(): void {
  console.info(
    "Welcome to the text adventure! Open your browser's developer console to play."
  );
  let playerName = input_name();

  console.info("Hello, " + playerName + ".");

  console.info("You are in a building. Your goal is to exit this building.");
  console.info(
    "You are in an empty room. There are doors on the south and east walls of this room."
  );

  let currentRoom: Room = "A";
  let hasKey: boolean = false;
  let windowOpen: boolean = false;

  while (currentRoom != "Exit") {
    let command = input_command();
    switch (currentRoom) {
      case "A":
        switch (command) {
          case "east":
            currentRoom = check_room_key(currentRoom, command, hasKey);
            break;
          case "south":
            currentRoom = check_room_key(currentRoom, command, hasKey);
            break;
          default:
            console.error("Unrecognized command.");
            break;
        }
        break;

      case "B":
        switch (command) {
          case "west":
            // currentRoom = "A";
            // console.info(
            //   "You are in an empty room. There are doors on the south and east walls of this room."
            // );
            currentRoom = check_room_key(currentRoom, command, hasKey);
            break;
          case "take key":
            if (hasKey) {
              console.error("You already have the key.");
            } else {
              console.info("You take the key from the table.");
              hasKey = true;
            }
            //  currentRoom = check_room_key(currentRoom, command, hasKey);
            break;
          default:
            console.error("Unrecognized command.");
            break;
        }
        break;

      case "C":
        switch (command) {
          case "north":
            // currentRoom = "A";
            // console.info(
            //   "You are in an empty room. There are doors on the south and east walls of this room."
            // );
            currentRoom = check_room_key(currentRoom, command, hasKey);
            break;
          case "east":
            // if (windowOpen) {
            //   currentRoom = "Exit";
            //   console.info("You step out from the open window.");
            // } else {
            //   console.error("The window is closed.");
            // }
            currentRoom = check_room_key(currentRoom, command, windowOpen);
            break;
          case "open window":
            // if (windowOpen) {
            //   console.error("The window is already open.");
            // } else {
            //   console.info("You open the window.");
            //   windowOpen = true;
            // }
            windowOpen = window_check(currentRoom, command, windowOpen);
            break;
          default:
            console.error("Unrecognized command.");
            break;
        }
        break;
    }
  }

  console.info("You have exited the building. You win!");
  console.info("Congratulations, " + playerName + "!");
}

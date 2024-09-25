import sys

import subprocess
 
def main():
 
    # parse arguments as command for netopeer2-cli

    command = " ".join(sys.argv[1:])

    print("command:", command)
 
    # Start the netopeer2-cli process

    process = subprocess.Popen(

        ['netopeer2-cli'],

        stdin=subprocess.PIPE,

        stdout=subprocess.PIPE,

        stderr=subprocess.PIPE,

        text=True

    )
 
    # Send 'connect' followed by command entered by user

    process.stdin.write('connect' + "\n" + command + "\n")

    process.stdin.flush()
 
    # Read the output

    output, errors = process.communicate()
 
    # Print the output and errors

    print("Output:\n", output)

    print("Errors:\n", errors)
 
if __name__ == "__main__":

    main()
 
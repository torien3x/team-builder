// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  // ✨ Create a third state to track the values of the inputs
  const [values, setValues] = useState({
    fname:"", lname:"", bio:""
  });

  useEffect(() => {
    // ✨ If the `editing` state changes from null to the number 2 (for example)
    // this means we need to populate the inputs of the form
    // with the data belonging to the member with id 2.
    // On the other hand, if the `editing` state changes back to null
    // then we need to reset the form back to empty values
  }, [editing])

  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form

    setValues({
      ...values,
      [evt.target.id]: evt.target.value
    })

  }
  const edit = (id) => {
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
    setEditing(id)
  }
  const submitNewMember = (member) => {
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
    
    setMembers([...members, {id: members.length + 1, ...member}])
    console.log(member)
  }

  const editExistingMember = e => {
    e.preventDefault();
    // Find the member being edited in the 'members' state
    const editedMemberIndex = members.findIndex(member => member.id === editing);
    if (editedMemberIndex !== -1) {
      // Clone the 'members' array
      const updatedMembers = [...members];
      // Update the member's data with the new values
      updatedMembers[editedMemberIndex] = {
        ...updatedMembers[editedMemberIndex],
        ...values
      };
      // Update the 'members' state with the edited member
      setMembers(updatedMembers);
      // Reset the 'editing' state
      setEditing(null);
    }
  };

  const onSubmit = (evt, member) => {
    evt.preventDefault();
    // Determine whether to add a new member or edit an existing member
    if (editing === null) {
      // If not editing, submit a new member
      submitNewMember(member);
    } else {
      // If editing, submit the edited member
      editExistingMember(evt);
    }
  };

  console.log(editing)
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form>
          <div>
            <label htmlFor="fname">First Name </label>
            <input 
              id="fname" type="text" 
              placeholder="Type First Name" 
              onChange={onChange} 
              value={values.fname} 
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input 
              id="lname" 
              type="text" 
              placeholder="Type Last Name" 
              onChange={onChange} 
              value={values.lname}
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea id="bio" placeholder="Type Bio"  onChange={onChange} value={values.bio} />
          </div>

          <div>
            <input type="submit" onClick={(event) => onSubmit(event, values)} />
          </div>
        </form>
      </div>
    </div>
  )
}

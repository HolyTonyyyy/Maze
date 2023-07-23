const goNorthHandler = async (event) => {
    console.log('go north')

    await fetch('/api/goNorth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

    await fetch(`/room/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    document.location.reload();
  };

const goEastHandler = async (event) => {
    console.log('go east')

    await fetch('/api/goEast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

    await fetch(`/room/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    document.location.reload();
  };

const goSouthHandler = async (event) => {
    console.log('go south')

    await fetch('/api/goSouth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

    await fetch(`/room/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    document.location.reload();
  };

const goWestHandler = async (event) => {
    console.log('go west')

    await fetch('/api/goWest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

    await fetch(`/room/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    document.location.reload();
  };

try {
    document.querySelector('#northBtn')
            .addEventListener('click', goNorthHandler);    
} catch(err) {

}

try {
    document.querySelector('#eastBtn')
            .addEventListener('click', goEastHandler);    
} catch(err) {
    
}

try {
    document.querySelector('#southBtn')
            .addEventListener('click', goSouthHandler);    
} catch(err) {
    
}

try {
    document.querySelector('#westBtn')
            .addEventListener('click', goWestHandler);    
} catch(err) {
    
}

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfSire = 0;
    let currentChilde = this;
    while (currentChilde.creator !== null) {
      currentChilde = currentChilde.creator;
      numberOfSire ++;
    }
    return numberOfSire;
  }



  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let matchingVampire = [];

    if (this.name === name) {
      matchingVampire.push(this);
    }
    for (const offspring of this.offspring) {
      const offSpringsNamed = offspring.vampireWithName(name);
      if (offSpringsNamed){
        matchingVampire = matchingVampire.concat(offSpringsNamed);
      }  
    }
    if (matchingVampire[0]){
      return matchingVampire[0];
    }
    return null
  }


  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;

    for (const childe of this.offspring) {
      if (childe.offspring.length > 0) {
        totalDescendents += childe.totalDescendents;
      } 
        totalDescendents++;
    }

    return totalDescendents;
  }



  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];

    if (this.yearConverted > 1980) {
      millenials.push(this);
    }

    for (const childe of this.offspring) {
      const millenialChilde = childe.allMillennialVampires; // 3
      millenials = millenials.concat(millenialChilde);
    }

    return millenials;
  }


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let ancestorList = [];
    let currentChilde = this;
    while (currentChilde.creator !== null) {
      ancestorList.push(currentChilde);
      currentChilde = currentChilde.creator;
    }
    currentChilde = vampire;
    while (currentChilde.creator !== null) {
      if (ancestorList.includes(currentChilde)) {
        return currentChilde;
      }
      currentChilde = currentChilde.creator;
    }
    return currentChilde;
  }
}

module.exports = Vampire;


/**
 * Fixed point required to draw the limb.
 * Drawing starts from the fixed hinge,
 * the fixed hinge does not move in the canvas
 */
export enum FixedHinge {
  /**
   * Fixed point at the start of the limb (where it connects to the torso, e.g., hip or shoulder)
   */
  Top,

  /**
   * Fixed point at the end of the limb (e.g., ankle or wrist)
   */
  Bottom
}

/**
 * Positions for the rest keel, when user has to get back
 * to the rest position to complete a repetition
 */
export enum RestPosition {
  /**
   * Line starts from the inner Hinge and has the length of the inner limb section
   */
  MiddleToInner,
  /**
   * Line starts from the middle hinge and has the length of the outer limb section
   */
  MiddleToOuter,
  /**
   * Line starts from the inner hinge and has the size of both limb sections
   */
  InnerToOuter,
  /**
   * Line starts from the inner hinge and has the size of the inner limb section
   */
  InnerToMiddle,
  /**
   * Line starts from the outer hinge and has the length of both limb sections
   */
  OuterToInner
}

/**
 * Positions for the target zone, showing the position the user should aim for
 * The target zone is a closed-shaped arc, with a center point, a start angle and end angle
 */
export enum TargetZonePosition {
  /**
   * Center point always follows the fixed hinge
   * Start angle and end angle are always fixed within
   * the canvas, no matter what is the movement of the limb
   */
  FixedHingeGravity,
  /**
   * Center point always follows the middle hinge
   * Start angle and end angle are always fixed within
   * the canvas, no matter what is the movement of the limb
   */
  MiddleGravity,
  /**
   * Center point always follows the middle hinge
   * Start angle and end angle will change depending on the position of the inner section,
   * it allows to have the target zone "following" the inner section
   */
  MiddleInner
}

/**
 * Length of the target zone, ie. the radius of the Arc describing the target zone
 */
export enum TargetZoneLength {
  /**
   * Radius will have the size of the outer limb section (furthest from torso)
   */
  Inner,
  /**
   * Radius will have the size of the inner limb section (closest to torso)
   */
  Outer,
  /**
   * Radius will have the size of the while limb (inner + outer)
   */
  WholeLimb
}

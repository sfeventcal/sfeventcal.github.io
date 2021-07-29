function isGoldEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("gold")) {
        return true;
    }
    return false;
}

function isXPEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("experi") || summary.includes("XP")) {
        return true;
    }
    return false;
}

function isMushroomEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("mushroom")) {
        return true;
    }
    return false;
}

function isAnyEpicEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic")) {
        return true;
    }
    return false;
}

function isEpicThirstEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic") && (lowerText.includes("thirst") || lowerText.includes("quest"))) {
        return true;
    }
    return false;
}

function isEpicLuckEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic") && lowerText.includes("luck")) {
        return true;
    }
    return false;
}

function isEpicShopEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic") && lowerText.includes("shop")) {
        return true;
    }
    return false;
}

function isToiletEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("toilet") || lowerText.includes("aura")) {
        return true;
    }
    return false;
}

function isHourglassEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("hourglass")) {
        return true;
    }
    return false;
}

function isFruitsEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("animal") || lowerText.includes("fruit")) {
        return true;
    }
    return false;
}

function isBlacksmithEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("blacksmith") || lowerText.includes("splinter") || lowerText.includes("metal")) {
        return true;
    }
    return false;
}

function isSoulsEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("soul") || lowerText.includes("underworld")) {
        return true;
    }
    return false;
}

function isFortressEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("fortress") || lowerText.includes("wood") || lowerText.includes("stone") || lowerText.includes("forest")) {
        return true;
    }
    return false;
}

function isBlackFridayEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("black") && lowerText.includes("friday")) {
        return true;
    }
    return false;
}

function isLDEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("leg") && lowerText.includes("dung")) {
        return true;
    }
    return false;
}

function isMultiEvent(summary) {
    lowerText = summary.toLowerCase();
    if (isGoldEvent(summary) && isXPEvent(summary) && isMushroomEvent(summary)) {
        return true;
    }
    return false;
}

function isSpeculated(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("speculate")) {
        return true;
    }
    return false;
}

function eventClass(summary) {
    var classes = "";

    if (isGoldEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "gold";
    }
    if (isMushroomEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "mushrooms";
    }
    if (isHourglassEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "hourglasses";
    }
    if (isToiletEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "aura";
    }
    if (isFruitsEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "animals";
    }

    if (isEpicThirstEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "epic-thirst";
    }
    else if (isEpicLuckEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "epic-luck";
    }
    else if (isEpicShopEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "epic-shops";
    }

    if (isAnyEpicEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "epic";
    }

    if (isBlacksmithEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "blacksmith";
    }
    if (isSoulsEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "souls";
    }
    if (isFortressEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "fortress";
    }
    if (isXPEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "xp";
    }
    if (isBlackFridayEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "black-friday";
    }
    if (isLDEvent(summary)) {
        classes += (classes) ? " ": "";
        classes += "legendary-dungeon";
    }

    if (!classes) {
        classes = "other";
    }

    if (isSpeculated(summary)) {
        classes += (classes) ? " ": "";
        classes += "speculated";
    }
    return classes;
}

function mainEventBgColor(summary) {
    if (isMultiEvent(summary)) {
        return "#f57f17";
    }
    if (isMushroomEvent(summary)) {
        return "#d84315";
    }
    if (isGoldEvent(summary)) {
        return "#F9A825";
    }
    if (isXPEvent(summary)) {
        return "#0D47A1";
    }
    if (isAnyEpicEvent(summary)) {
        return "#6A1B9A";
    }
    if (isBlackFridayEvent(summary)) {
        return "#000";
    }

    // If not a secondary event, then it is some kind of special event
    if ((isHourglassEvent(summary) || isToiletEvent(summary) || isFruitsEvent(summary)) || isBlacksmithEvent(summary) || isSoulsEvent(summary) || isFortressEvent(summary)) {
        return "";
    }
    
    return "#3788d8";
}

function mainEventTextColor(summary) {
    if (mainEventBgColor(summary))
    {
        return "#ffffff";
    }
    return "";
}

function eventOrder(summary) {
    if (isMultiEvent(summary)) {
        return 0;
    }
    if (isMushroomEvent(summary)) {
        return 1;
    }
    if (isGoldEvent(summary) || isXPEvent(summary)) {
        return 2;
    }
    if (isEpicShopEvent(summary)) {
        return 3;
    }
    if (isAnyEpicEvent(summary)) {
        return 4;
    }
    if (isFortressEvent(summary)) {
        return 5;
    }
    if (isBlacksmithEvent(summary)) {
        return 6;
    }
    if (isToiletEvent(summary)) {
        return 7;
    }
    if (isSoulsEvent(summary)) {
        return 8;
    }
    if (isFruitsEvent(summary)) {
        return 9;
    }
    if (isHourglassEvent(summary)) {
        return 10;
    }
    if (isBlackFridayEvent(summary)) {
        return 11;
    }
    if (isLDEvent(summary)) {
        return 12;
    }
    return 100;
}

function eventShortName(title) {
    var shortName = title;

    if (isMushroomEvent(title)) {
        shortName = "Mushrooms";
    }
    else if (isGoldEvent(title)) {
        shortName = "Gold";
    }
    else if (isXPEvent(title)) {
        shortName = "XP";
    }
    else if (isEpicThirstEvent(title)) {
        shortName = "Epic Thirst";
    }
    else if (isEpicLuckEvent(title)) {
        shortName = "Epic Luck";
    }
    else if (isEpicShopEvent(title)) {
        shortName = "Epic Shops";
    }
    else if (isAnyEpicEvent(title)) {
        shortName = "Epic";
    }
    else if (isFortressEvent(title)) {
        shortName = "Fortress";
    }
    else if (isSoulsEvent(title)) {
        shortName = "Souls";
    }
    else if (isToiletEvent(title)) {
        shortName = "Toilet";
    }
    else if (isBlacksmithEvent(title)) {
        shortName = "Blacksmith";
    }
    else if (isFruitsEvent(title)) {
        shortName = "Animals";
    }
    else if (isHourglassEvent(title)) {
        shortName = "Hourglasses";
    }
    else if (isBlackFridayEvent(title)) {
        shortName = "Black Friday";
    }
    else if (isLDEvent(title)) {
        shortName = "Leg. Dungeon";
    }
    else {
        shortName = title.replace(/[ ]?speculated[ ]?/ig, '');
    }

    return shortName;
}

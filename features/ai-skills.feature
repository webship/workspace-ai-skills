Feature: The AI Skills workspace plugin
  Once the plugin is activated and installed, the ai-skills workspace is on the dashboard, and the
  Plugins page lists the plugin with its four steps.

  Scenario: The workspace page is there
    Given I am on "/ai-skills"
     Then the element "h1" should be displayed
      And "#webship-workspace-projects, .items-list, .workspace-page" should be attached

  # The Plugins page names each plugin; the package is on the plugin's own page (the row shows it on hover only).
  Scenario: The plugin is listed on the Plugins page, and its own page names its package
    Given I am on "/settings/plugins"
     Then I should see "AI Skills"
     When I go to "/settings/plugin/ai-skills"
     Then I should see "@webship.co/workspace-ai-skills"
